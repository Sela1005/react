import { Badge, Button, Col, Popover } from "antd";
import { useEffect, useState } from "react";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperHeaderCart,
} from "./Style";
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlide";
import Loading from "../LoadingComponent/Loading";
import Logo from "../../image/logo_theWorldBook7.jpg";
import { searchProduct } from "../../redux/slices/productSlide";

const HeaderComponent = () => {
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState("");
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setloading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
    setloading(false);
  };

  useEffect(() => {
    setloading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setloading(false);
  }, [user?.name, user?.avatar]);

  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigateProfile = () => {
    navigate("/profile-user");
  };
  const handleNavigateAdmin = () => {
    navigate("/system/admin");
  };
  const handleNavigateLogo = () => {
    navigate("/");
  };
  const content = (
    <div>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={handleNavigateAdmin}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}

      <WrapperContentPopup onClick={handleNavigateProfile}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/my-order")}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div>
      <WrapperHeader gutter={30}>
        <Col span={5}>
          <div onClick={handleNavigateLogo}>
            <img
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
              src={Logo}
            ></img>
            <span
              style={{
                marginLeft: "20px",
                fontSize: "20px",
                color: "white",
                cursor: "pointer",
              }}
            >
              TheWordBook
            </span>
          </div>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            placeholder="Tìm kiếm... "
            textButton="Search"
            size="large"
            onChange={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", alignItems: "center", gap: "54px" }}
        >
          <WrapperHeaderAccount>
            <Loading isPending={loading}>
              <Popover
                placement="bottomRight"
                content={user?.access_token ? content : null}
              >
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <Button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#21a8d9",
                    }}
                    type="primary"
                  >
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt="avatar"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <UserOutlined style={{ fontSize: "20px" }} />
                    )}

                    {user?.access_token ? (
                      <div
                        style={{
                          cursor: "pointer",
                          padding: "5px",
                        }}
                      >
                        {userName?.length ? userName : user?.email}
                      </div>
                    ) : (
                      "Đăng Nhập/Đăng ký"
                    )}
                    <CaretDownOutlined />
                  </Button>
                </div>
              </Popover>
            </Loading>

            <WrapperHeaderCart
              onClick={() => navigate("/order")}
              style={{ cursor: "pointer" }}
            >
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  color: "#ffffff",
                  marginLeft: "10px",
                  border: "1px solid",
                }}
                type="text"
              >
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined
                    style={{
                      fontSize: "30px",
                      color: "#fff",
                      marginRight: "5px",
                    }}
                  />
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
