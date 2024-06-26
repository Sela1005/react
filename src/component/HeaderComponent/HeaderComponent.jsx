import { Badge, Button, Col, Flex } from "antd";
import React from "react";
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderCart } from "./Style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
   const handleNavigateLogin = () => { 
    navigate('/sign-in')
    console.log('user',user)
   }
  return (
    <div>
      <WrapperHeader gutter={30}>
        <Col span={5}>Logo</Col>
        <Col span={13}>
          <ButtonInputSearch
            placeholder="Tìm kiếm... "
            textButton="Search"
            size="large"
            
          />
        </Col>
        <Col span={6} style={{ display: 'flex', alignItems: 'center', gap: '54px' }}>
          <WrapperHeaderAccount>
            
            <div onClick={handleNavigateLogin} style={{cursor: "pointer"}}><Button 
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: '#21a8d9'
                
              }}
              type="primary"
            >
              <UserOutlined style={{ fontSize: "20px" }} />
              {user?.name ? (
                <div style={{cursor: "pointer", padding: '5px'}}>{user.name}</div>
            ):(
              'Đăng Nhập/Đăng ký'
            )}
              <CaretDownOutlined />
            </Button></div>
            
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
