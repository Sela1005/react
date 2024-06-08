import React from "react";
import { WapperContent, WapperLabelText, WapperTextValue } from "./style";
import { Checkbox, Col, Row } from "antd";

const NavBarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, option) => {
    switch (type) {
      case "text":
        return option.map((option) => {
          return <WapperTextValue>{option}</WapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group style={{ width: "100%", display: "flex",flexDirection:"column",gap: '12px'}} onChange={onChange}>
            {option.map((option)=>{
                return (
                    <Checkbox style={{marginLeft: 0}} value={option.value}>{option.label}</Checkbox>
                    
                )
            })}
          </Checkbox.Group>
        );
      default:
        return {};
    }
  };

  return (
    <div>
      <WapperLabelText>NHÓM SẢN PHẨM</WapperLabelText>
      <WapperContent>
        {renderContent("text", ["Tieu thuyet", "Truyen ngan", "blabla"])}
        </WapperContent>
        <WapperContent>
        {renderContent("checkbox", [
            {value: 'a', label: 'Drama'},
            {value: 'b', label: 'Shounen'},
            {value: 'c', label: 'Adventure'},
            {value: 'd', label: 'Action'},
            {value: 'e', label: 'Fantasy'}
        ])}
        </WapperContent>
        
      
    </div>
  );
};

export default NavBarComponent;
