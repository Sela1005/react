import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({ size, style, type, icon, textButton,disabled, ...rests }) => {
  return ( 
    <Button
      style={{
        ...style,
        background: disabled ? '#cccc': style?.background}}
      size={size}
      icon={icon}
      type={type}
      {...rests}
    >
      {textButton}
    </Button>
  );
}

export default ButtonComponent;
