import { Badge, Button, Col, Flex, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperHeaderCart } from "./Style";
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from "../../slices/userSlide";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [loading, setloading] = useState(false)

  const dispatch = useDispatch()

  const handleLogout = async () => {
      setloading(true)
      await UserService.logoutUser()
      dispatch(resetUser())
      setloading(false)
  }

  useEffect(() => {
    setloading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setloading(false)
  },[user?.name, user?.avatar])

  const navigate = useNavigate()
   const handleNavigateLogin = () => { 
    navigate('/sign-in')
   }
   const handleNavigateProfile= () => { 
    navigate('/profile-user')
   }
   const handleNavigateAdmin= () => { 
    navigate('/system/admin')
   }
   const content = (
    <div>
      {user?.isAdmin && (
      <WrapperContentPopup onClick={handleNavigateAdmin}>Quản lý hệ thống</WrapperContentPopup>)}
      
      <WrapperContentPopup onClick={handleNavigateProfile}>Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
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
          <Popover placement="bottomRight" content={content} >
            <div onClick={handleNavigateLogin} style={{cursor: "pointer"}}><Button 
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: '#21a8d9'
                
              }}
              type="primary"
            >
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'contain',
                }} />
              ) : (
                <UserOutlined style={{ fontSize: "20px" }} />
              )}
              
              {user?.access_token ? (
                <div style={{cursor: "pointer", padding: '5px'}}>{userName?.length ? userName: user?.email}</div>
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
