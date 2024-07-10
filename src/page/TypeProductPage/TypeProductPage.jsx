import React from 'react'
import NavBarComponent from '../../component/NavBarComponent/NavBarComponent'
import CardComponent from '../../component/CardComponent/CardComponent'
import { Col, Row } from 'antd'
import { WapperNavBar, WapperProduct } from './TypeProductPage'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from "../../services/ProductService"


const TypeProductPage = () => {
  const fetchProductAll = async () => {
    const res =  await ProductService.getAllProduct()
    console.log('res', res)
    return res
  }
  
  const {isLoading, data: products} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  })
  return (
    <Row style={{padding: '0 120px', background: '#f0f0f0', flexWrap: 'nowrap',paddingTop: '15px', height: "2000px"}}>
        <WapperNavBar>
        <NavBarComponent/>
        </WapperNavBar>
        <Col span={20}>
        <WapperProduct>
      {products?.data?.map((product)=> {
        return (
          <CardComponent 
            key={product._id} 
            countInStock={product.countInStock} 
            description={product.description} 
            image= {product.image} 
            name = {product.name}
            price = {product.price}
            rating = {product.rating}
            type={product.type}
            selled = {product.selled}
            discount = {product.discount}
            />
        )
      })}
    </WapperProduct>
        </Col>
    </Row>
  )
}

export default TypeProductPage