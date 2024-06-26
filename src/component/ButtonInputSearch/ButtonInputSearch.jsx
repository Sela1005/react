import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton } = props;

  return (
    <Space.Compact style={{ display: 'flex', width: '100%' }}>
      <Input size={size} placeholder={placeholder} style={{ flex: 1 }} />
      <ButtonComponent 
        style={{ backgroundColor: "rgb(14, 86, 150)", color: "#fff", border: "none" }} 
        size={size} 
        icon={<SearchOutlined />}
        type="primary"
        textButton={textButton}
      />
    </Space.Compact>
  );
};

export default ButtonInputSearch;
