import React from 'react'

import Row from 'react-bootstrap/Row';

import { useProductListData } from '../redux/hooks'
import ProductCard from '../components/ProductCard';
import GoBackButton from '../ui/GoBackButton';

const Products = () => {
  const { productList, isProductListEmpty } = useProductListData();

  if(isProductListEmpty){
    return (
      <div> No products added yet. </div>
    )
  } else {
    return (
      <div className='align-items-start p-4'>
        <GoBackButton />
        <h1>Products</h1>
        <Row xs={1} sm={2} md={3} lg={4}>
          {productList.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </Row>
      </div>
    )
  }
}

export default Products
