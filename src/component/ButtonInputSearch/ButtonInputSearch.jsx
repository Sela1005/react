import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton } = props;

  return (
    <Input.Group compact style={{ display:'flex'}}>
      <Input size={size} placeholder={placeholder} style={{ flex: 1 }} />
      <ButtonComponent 
        style={{ backgroundColor: "rgb(14, 86, 150)", color: "#fff", border: "none" }} 
        size={size} 
        icon={<SearchOutlined />}
        type="primary"
        textButton={textButton}
      />
    </Input.Group>
  );
};

export default ButtonInputSearch;
