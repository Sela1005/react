import { Badge, Button, Col, Flex, Popover } from "antd";
import React, { useState } from "react";
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperHeaderCart } from "./Style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from "../../slices/userSlide";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
  const [loading, setloading] = useState(false)

  const dispatch = useDispatch()

  const handleLogout = async () => {
      setloading(true)
      await UserService.logoutUser()
      dispatch(resetUser())
      setloading(false)
  }

  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
   const handleNavigateLogin = () => { 
    navigate('/sign-in')
   }
   const handleNavigateProfile= () => { 
    navigate('/profile-user')
   }
   const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
      <WrapperContentPopup onClick={handleNavigateProfile}>Thông tin người dùng</WrapperContentPopup>
    </div>
  );
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
          <Loading isPending={loading}>
          <Popover placement="bottom" content={content} >
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
        </Popover>
        </Loading>
            
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
