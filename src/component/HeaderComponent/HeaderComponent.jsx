import { Badge, Button, Col, Flex } from "antd";
import React from "react";
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderCart } from "./Style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader gutter={30}>
        <Col span={6}>Logo</Col>
        <Col span={12}>
          <ButtonInputSearch
            placeholder="Tìm kiếm... "
            textButton="Search"
            size="large"
            
          />
        </Col>
        <Col span={6} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <WrapperHeaderAccount>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="primary"
            >
              <UserOutlined style={{ fontSize: "20px" }} />
              Đăng Nhập/Đăng ký
              <CaretDownOutlined />
            </Button>
            <WrapperHeaderCart>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  color: "#ffffff",
                  marginLeft: '10px',
                  border: '1px solid'
                }}
                type="text"
              > 
              <Badge count = {2} size="small">
                  <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff', marginRight: '5px'}} />
              </Badge>
              Giỏ Hàng
              </Button>
            </WrapperHeaderCart>
          </WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
