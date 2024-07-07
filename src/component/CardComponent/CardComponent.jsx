import { Card } from "antd";
import React from "react";
import { StyleNameProduct, WapperDiscountText, WapperPriceText, WapperReportText } from "./style";
import { StarFilled } from "@ant-design/icons";

const CardComponent = (props) => {
  const {countInStock, description, image, name,price, rating, type, discount, selled } = props
  return (
    <Card
      hoverable
      style={{ width: 240, padding: 10 }}
      bodyStyle={{padding: 10}}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <div style={{display:"flex",alignItems:"center"}}>
      <WapperPriceText>
        <span style={{marginRight: '8px'}}>{price}</span>
      <WapperDiscountText>{discount || 5}%</WapperDiscountText>
        
      </WapperPriceText>
      </div>
      <WapperReportText>
        <span>{rating} <StarFilled
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
        /></span>
        <span>
        <span style={{marginLeft:"2px"}}> | Đã bán {selled || 1000 }+</span>
        
        </span>
      </WapperReportText>
    </Card>
  );
};

export default CardComponent;
