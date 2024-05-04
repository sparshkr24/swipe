import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { FaCheck } from 'react-icons/fa'
import { BiSolidPencil, BiTrash } from 'react-icons/bi'

import EditableInvoiceItemRow from './EditableInvoiceItemRow'
import { updateEditState, updateProduct } from '../redux/productsSlice'
import { useProductListData } from '../redux/hooks'
import { InputGroup } from 'react-bootstrap'

const InvoiceItemRow = ({ product, currency, allItems, setAllItems }) => {
  const dispatch = useDispatch()

  const { editItemId } = useProductListData()
  const [editedProduct, setEditedProduct] = useState(product)

  const onChange = useCallback((e)=>{
    setEditedProduct((prev)=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }, [])

  const handleEdit = useCallback((productId)=>{
    dispatch(updateEditState({ value: productId }))
  }, [dispatch])

  const handleDelete = useCallback((productId)=>{
    const updatedAllItems = allItems.filter((item) => item.id !== productId)
    setAllItems(updatedAllItems)
  }, [allItems, setAllItems])
  
  const handleSubmit = useCallback(()=>{
    dispatch(updateEditState({ value: null }))
    dispatch(updateProduct({ updatedProduct: editedProduct }))
    const index = allItems.findIndex(item => item.id === editedProduct.id);

    if (index !== -1) {
      const updatedAllItems = [...allItems];
      updatedAllItems[index] = editedProduct;
      setAllItems(updatedAllItems);
    }
  }, [dispatch, allItems, editedProduct, setAllItems])

  const isEditingOn = useMemo(() => {
    return editItemId === product.id
  }, [editItemId, product])

  return (
    <tr key={product.id}>
      {
        isEditingOn ? (
          <EditableInvoiceItemRow
            editedProduct={editedProduct} 
            onChange={onChange}
            currency={currency}
          />
        ) : (
          <>
            <td>
              <div className="fw-bold bg-light p-2 rounded d-inline-block mb-1">
                {product.name}
              </div>
              {product.desc ? (
                <div className="bg-light p-2 rounded">
                  {product.desc.length > 50 ? product.desc.slice(0, 80) + "..." : product.desc}
                </div>
                ) : null
              }
            </td>
            <td>
              <span className="d-flex justify-content-center bg-light fw-bold p-2 rounded">
                {product.quantity}
              </span>
            </td>
            <td>
              <span className="d-flex justify-content-center align-items-center bg-light fw-bold p-2 rounded">
                <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
                  <span
                    className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
                    style={{ width: "20px", height: "20px" }}
                  >
                    {currency}
                  </span>
                </InputGroup.Text>
                {product.price}
              </span>
            </td>
          </>
        )
      }
      <td>
        <ButtonGroup>
          {isEditingOn ? 
            <Button variant="btn" className="bg-light" onClick={handleSubmit}>
              <FaCheck />
            </Button>
            : <Button variant="btn" className="bg-light" onClick={() => handleEdit(product.id)}>
                <BiSolidPencil />
              </Button>
          }
          <Button 
            variant="btn btn-danger"
            onClick={() => handleDelete(product.id)}
          >
            <BiTrash />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )
}

export default InvoiceItemRow
