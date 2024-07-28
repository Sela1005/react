import React from "react";
import { WapperContent, WapperLabelText, WapperTextValue } from "./style";
import { Checkbox } from "antd";

const NavBarComponent = () => {
  const onChange = () => {};
  
  const renderContent = (type, option) => {
    switch (type) {
      case "text":
        return option.map((option, index) => (
          <WapperTextValue key={index}>{option}</WapperTextValue>
        ));
      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column", gap: '12px' }}
            onChange={onChange}
          >
            {option.map((option) => (
              <Checkbox key={option.value} style={{ marginLeft: 0 }} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <WapperLabelText>NHÓM SẢN PHẨM</WapperLabelText>
      <WapperContent>
        {renderContent("text", [ "Thể loại"])}
      </WapperContent>
      <WapperContent>
        {renderContent("checkbox", [
          { value: 'a', label: 'Kinh Tế' },
          { value: 'b', label: 'Manga' },
          { value: 'c', label: 'Thiếu Nhi' },
          { value: 'd', label: 'Tâm lý' },
          { value: 'e', label: 'Văn học' }
        ])}
      </WapperContent>
    </div>
  );
};

export default NavBarComponent;
