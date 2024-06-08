import { Card } from "antd";
import React from "react";
import { StyleNameProduct, WapperDiscountText, WapperPriceText, WapperReportText } from "./style";
import { StarFilled } from "@ant-design/icons";

const CardComponent = () => {
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
      <StyleNameProduct>Conan</StyleNameProduct>
      <div style={{display:"flex",alignItems:"center"}}>
      <WapperPriceText>
        69.300 đ <WapperDiscountText>-30%</WapperDiscountText>
        
      </WapperPriceText>
      </div>
      <WapperReportText>
        <span>4.9</span>
        <span>
        <span style={{marginLeft:"2px"}}> | Đã bán 3.1k</span>
        <StarFilled
          style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
        />
        </span>
      </WapperReportText>
    </Card>
  );
};

export default CardComponent;
