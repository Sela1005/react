import { Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import imageProduct from '../../image/sach_1.jpg'
import imageProductSmall from '../../image/sach_1.4.jpg'
import { WapperButtonMore, WapperPriceBlock, WapperQualityCountProduct, WapperQualityProduct, WapperStyleAssess, WapperStyleImage, WapperStyleImageSmall, WapperStyleNameProduct, WapperTextPrice } from './Style'
import { PlusOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailsComponent = () => {
  const onChange = (value) => {
    console.log('changed', value);
  };
  return (
    <Row style={{padding: '25px'}}>
        <Col span={10}>
        <WapperStyleImage  src={imageProduct} alt='image product' preview='true'/>
            <Row style={{paddingTop:'10px', marginRight: '20px'}}>
              <Col span={4}>
                  <WapperStyleImageSmall src={imageProductSmall} alt='image small' preview='true' />
              </Col>
              <Col span={4}>
                  <WapperStyleImageSmall src={imageProductSmall} alt='image small' preview='true' />
              </Col>
              <Col span={4}>
                  <WapperStyleImageSmall src={imageProductSmall} alt='image small' preview='true' />
              </Col>
              <Col span={4}>
                  <WapperStyleImageSmall src={imageProductSmall} alt='image small' preview='true' />
              </Col>
              <Col span={4}>
                  <WapperStyleImageSmall src={imageProductSmall} alt='image small' preview='true' />
              </Col>
              <Col span={4}>
                  <WapperStyleImageSmall src={imageProductSmall} alt='image small' preview='true' />
              </Col>
            </Row>
        </Col>
        <Col span={14}>
            <WapperStyleNameProduct>Cây cam ngọt của tôi</WapperStyleNameProduct>

            <div>
            <StarFilled
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
            />
            <StarFilled
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
            />
            <StarFilled
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
            />
            <StarFilled
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
            />
            <StarFilled
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
            />
             <WapperStyleAssess style={{marginLeft:"2px"}}> (10 đánh giá)</WapperStyleAssess>
            </div>
            <WapperPriceBlock>
                <WapperTextPrice>
                  200.000đ
                </WapperTextPrice>
            </WapperPriceBlock>
            <div>
              <WapperQualityProduct>
                <WapperQualityCountProduct htmlFor=""> Số Lượng: </WapperQualityCountProduct>
                <div>
                <InputNumber  defaultValue={1} min={1} max={10} size='large' onChange={onChange}/>
                </div>
              </WapperQualityProduct>
            </div>
            <div style={{marginTop: '50px', display:'flex', alignItems:'center'}}>
                  <WapperButtonMore
                      textButton='Mua Ngay' type='primary' style={{width: '150px', height: '34px', marginTop: '20px',background: 'rgb(69, 136, 181)'}}
                    />
                  <WapperButtonMore icon={<ShoppingCartOutlined style={{fontSize: '30px', color: 'rgb(69, 136, 181)', marginRight: '5px'}} />} textButton='Thêm vào giỏ hàng' type='dashed' style={{width: '200px', height: '34px', marginTop: '20px',marginLeft: '20px'}}></WapperButtonMore>
            </div>
        </Col>
  </Row>
  )
}

export default ProductDetailsComponent