import React from 'react'
import { useProductListData } from '../redux/hooks'
import { Col, Row } from 'react-bootstrap';

const Products = () => {
  const { productList, isProductListEmpty } = useProductListData();

  if(isProductListEmpty){
    return (
      <div> No products added yet. </div>
    )
  } else {
    return (
      <div className='align-items-start'>
        <h1>Products</h1>
        <Row xs={1} sm={2} md={3} lg={4}>
          {productList.map(({ name, desc, price }, index) => (
            <Col key={index} className="mb-4">
              <div className="product-card">
                <div>
                  <img src='' alt='img' />
                </div>
                <div>
                  <strong>{name}</strong> <br />
                  {desc} <br />
                  Price: {price}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

export default Products
