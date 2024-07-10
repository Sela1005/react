import { BookOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Switch } from 'antd';
import React, { useState } from 'react';
import AdminUser from '../../component/AdminUser/AdminUser';
import AdminProduct from '../../component/AdminProduct/AdminProduct';

const items = [
  {
    key: 'user',
    label: 'Người dùng',
    icon: <UserOutlined />,
  },
  {
    key: 'product',
    label: 'Sản phẩm',
    icon: <BookOutlined />,
  },
];

const AdminPage = () => {
  const [theme, setTheme] = useState('light');
  const [key, setKey] = useState('user');

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleOnClick = (e) => {
    setKey(e.key);
  };

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return( 
        <AdminUser />
        )
      case 'product':
        return(
           <AdminProduct />
          )
      default:
        return <></>
    }
  };

  return (
    <div style={{ display: 'flex', background: theme === 'dark' ? '#001529' : '#ffff' }}>
      <Menu
        theme={theme}
        onClick={handleOnClick}
        style={{
          width: 220,
          height: '100vh',
          boxShadow: '1px 1px 2px #ccc',
        }}
        defaultOpenKeys={['user']}
        selectedKeys={[key]}
        mode="inline"
        items={items}
      />
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        style={{ position: 'absolute', right: '20px', top: '20px' }}
      />
      <div style={{ flex: 1, padding: '15px'}}>
        {renderPage(key)}
      </div>
    </div>
  );
};

export default AdminPage;
