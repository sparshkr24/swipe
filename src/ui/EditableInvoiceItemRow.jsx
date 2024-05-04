import React from 'react'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const EditableInvoiceItemRow = ({ editedProduct, onChange, currency }) => {
  return (
  <>
    <td>
      <div className="fw-bold d-inline-block mb-1">
        <Form.Control name="name" value={editedProduct.name} onChange={onChange} />
      </div>
      <div className="ml-4">
        <Form.Control name="desc" value={editedProduct.desc} onChange={onChange} />
      </div>
    </td>

    <td>
      <span className="d-flex justify-content-center fw-bold">
        <Form.Control name="quantity" value={editedProduct.quantity} onChange={onChange} />
      </span>
    </td>
    <td>
      <span className="d-flex justify-content-center align-items-center fw-bold bg-light rounded">
        <InputGroup.Text className="fw-bold border-0 text-secondary px-2">
          <span
            className="border border-2 border-secondary rounded-circle small"
            style={{ width: "20px", height: "20px" }}
          >
            {currency}
          </span>
        </InputGroup.Text>
        <Form.Control name="price" value={editedProduct.price} onChange={onChange} />
      </span>
    </td>
  </>
  )
}

export default EditableInvoiceItemRow
