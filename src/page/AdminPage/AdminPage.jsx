import {  BookOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Switch } from 'antd'
import React, { useState } from 'react'

const items = [
  {
    key: 'sub1',
    label: 'Người dùng',
    icon: <UserOutlined />,
    children: [
      {
        key: '1',
        label: 'Option 1',
      },
      {
        key: '2',
        label: 'Option 2',
      },
      {
        key: '3',
        label: 'Option 3',
      },
      {
        key: '4',
        label: 'Option 4',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Sản phẩm',
    icon: <BookOutlined />,
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '7',
            label: 'Option 7',
          },
          {
            key: '8',
            label: 'Option 8',
          },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'BLA BLA',
    icon: <SettingOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: '11',
        label: 'Option 11',
      },
      {
        key: '12',
        label: 'Option 12',
      },
    ],
  },
];

const AdminPage = () => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key); // Set current key when menu item is clicked
    // Perform additional actions based on the clicked item key
    // For example, navigate to a different page or perform some logic
    switch (e.key) {
      case '1':
        // Handle Option 1 click
        break;
      case '2':
        // Handle Option 2 click
        break;
      // Add more cases as needed for other menu items
      default:
        break;
    }
  };
  return (
  <div style={{ background: theme === 'dark' ? '#001529' : '#ccc' }}>
    <div style={{ background: theme === 'dark' ? '#001529' : '#ffff', padding: '10px' }}>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </div>
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 200,
          height: 700
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />

    </div>
  )
}

export default AdminPage