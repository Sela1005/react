import {
  BarChartOutlined,
  BookOutlined,
  PercentageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import React, { useState, useMemo } from "react";
import AdminUser from "../../component/AdminUser/AdminUser";
import AdminProduct from "../../component/AdminProduct/AdminProduct";
import AdminOrder from "../../component/AdminOrder/AdminOrder";
import { useSelector } from "react-redux";
import AdminDiscount from "../../component/AdminDiscount/AdminDiscount";
import AdminRevenue from "../../component/AdminRevenue/AdminRevenue"
export const themeConstant = {
  light: {
    background: "#ffffff",
    color: "#000000",
  },
  dark: {
    background: "#000000",
    color: "#ffffff",
  },
};

const AdminPage = () => {
  const user = useSelector((state) => state?.user);

  const [theme, setTheme] = useState("light");
  const [key, setKey] = useState("");

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  const handleOnClick = (e) => {
    setKey(e.key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return (
          <AdminUser
            theme={theme}
            setTheme={setTheme}
            themeConstant={themeConstant}
          />
        );
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      case "discount":
        return <AdminDiscount />;
      case "revenue":
        return <AdminRevenue />;
      default:
        return <></>;
    }
  };
  const items = useMemo(() => {
    const baseItems = [];
    if (user?.role === "NhanVienIT") {
      baseItems.unshift({
        key: "user",
        label: "Người dùng",
        icon: <UserOutlined />,
      });
    }
    if (user?.role === "KeToan") {
      baseItems.unshift({
        key: "order",
        label: "Đơn hàng",
        icon: <ShoppingCartOutlined />,
      });
    }

    if (user?.role === "ThuKho") {
      baseItems.unshift({
        key: "product",
        label: "Sản phẩm",
        icon: <BookOutlined />,
      });
    }
    if (user?.role === "QuanLy") {
      baseItems.unshift({
        key: "user",
        label: "Người dùng",
        icon: <UserOutlined />,
      });
    }
    if (user?.role === "QuanLy") {
      baseItems.unshift({
        key: "product",
        label: "Sản phẩm",
        icon: <BookOutlined />,
      });
    }
    if (user?.role === "QuanLy") {
      baseItems.unshift({
        key: "order",
        label: "Đơn hàng",
        icon: <ShoppingCartOutlined />,
      });
    }

    if (user?.role === "QuanLy") {
      baseItems.unshift({
        key: "discount",
        label: "Mã giảm giá",
        icon: <PercentageOutlined />,
      });
    }
    if (user?.role === "QuanLy") {
      baseItems.unshift({
        key: "revenue",
        label: "Doanh thu",
        icon: <BarChartOutlined />,
      });
    }
    return baseItems;
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        background: theme === "dark" ? "#001529" : "#ffff",
      }}
    >
      <Menu
        theme={theme}
        onClick={handleOnClick}
        style={{
          width: 220,
          height: "100vh",
          boxShadow: "1px 1px 2px #ccc",
        }}
        defaultOpenKeys={["user"]}
        selectedKeys={[key]}
        mode="inline"
        items={items}
      />
      <Switch
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        style={{ position: "absolute", right: "20px", top: "20px" }}
      />
      <div style={{ flex: 1, padding: "15px 0 15px 15px" }}>
        {renderPage(key)}
      </div>
    </div>
  );
};

export default AdminPage;
