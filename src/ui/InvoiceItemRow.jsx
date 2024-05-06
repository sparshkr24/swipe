import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaCheck } from 'react-icons/fa'
import { BiSolidPencil, BiTrash } from 'react-icons/bi'

import { deleteAssociatedId, updateEditState, updateProduct } from '../redux/productsSlice'
import { useProductListData } from '../redux/hooks'

const InvoiceItemRow = ({ product, currency, allItems, setAllItems, invoiceId }) => {
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
    dispatch(deleteAssociatedId({ productId, invoiceId }))
    const updatedAllItems = allItems.filter((item) => item.id !== productId)
    setAllItems(updatedAllItems)
  }, [dispatch, allItems, setAllItems, invoiceId])
  
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
      <td>
        <div className="fw-bold d-inline-block mb-1">
          <Form.Control 
            className={`${!isEditingOn ? 'fw-bold' : 'border border-1'}`} 
            type="text"
            readOnly={!isEditingOn} 
            name="name" 
            value={editedProduct.name} 
            onChange={onChange} 
          />
        </div>
        <div>
          <Form.Control 
            className={`${!isEditingOn ? 'fw-bold' : 'border border-1'}`} 
            type="text"
            readOnly={!isEditingOn} 
            name="desc" 
            value={editedProduct.desc} 
            onChange={onChange} 
          />
        </div>
      </td>

      <td>
        <span className="d-flex justify-content-center fw-bold">
          <Form.Control 
            className={`${!isEditingOn ? 'fw-bold' : 'border border-1'}`} 
            type="number"
            min={1}
            readOnly={!isEditingOn} 
            name="quantity" 
            value={editedProduct.quantity} 
            onChange={onChange} 
          />
        </span>
      </td>
      <td>
        <span className="d-flex justify-content-center align-items-center fw-bold bg-light rounded">
          <InputGroup.Text className="fw-bold border-0 text-secondary px-2">
            <span
              className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
              style={{ width: "20px", height: "20px" }}
            >
              {currency}
            </span>
          </InputGroup.Text>
          <Form.Control 
            className={`${!isEditingOn ? 'fw-bold' : 'border border-1'}`}
            type="number"
            min={1}
            presicion={2}
            readOnly={!isEditingOn} 
            name="price" 
            value={editedProduct.price} 
            onChange={onChange} 
          />
        </span>
      </td>
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
