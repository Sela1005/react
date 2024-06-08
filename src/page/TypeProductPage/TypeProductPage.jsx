import React from 'react'
import NavBarComponent from '../../component/NavBarComponent/NavBarComponent'
import CardComponent from '../../component/CardComponent/CardComponent'
import { Col, Row } from 'antd'
import { WapperNavBar, WapperProduct } from './TypeProductPage'

const TypeProductPage = () => {
  return (
    <Row style={{padding: '0 120px', background: '#f0f0f0', flexWrap: 'nowrap',paddingTop: '15px', height: "2000px"}}>
        <WapperNavBar>
        <NavBarComponent/>
        </WapperNavBar>
        <Col span={20}>
        <WapperProduct>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
        </WapperProduct>
        </Col>
    </Row>
  )
}

export default TypeProductPage