import React from "react";
import TypeProduct from "../../component/TypeProduct/TypeProduct";
import { WapperButtonMore, WapperProduct, WapperTypeProduct } from "./style";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import slider1 from "../../image/slider1.jpg";
import slider2 from "../../image/silder2.jpg";
import slider3 from "../../image/slider3.jpg";
import CardComponent from "../../component/CardComponent/CardComponent";
import NavBarComponent from "../../component/NavBarComponent/NavBarComponent";

const Home = () => {
  const arr = [
    "VĂN HỌC",
    "KINH TẾ",
    "TÂM LÝ",
    "SÁCH THIẾU NHI",
    "GIÁO KHOA - THAM KHẢO",
  ];

  const arrImages = [slider1, slider2, slider3];

  return (
    <>
    <div style={{ padding: "0 120px" }}>
      <WapperTypeProduct>
        {arr.map((item) => (
          <TypeProduct name={item} key={item} />
        ))}
      </WapperTypeProduct>
    </div>
    <div style={{backgroundColor: '#f0f0f0', paddingTop:'10px',padding: "0 120px", height: "2000px"}}>
      <SliderComponent arrImages={arrImages}/>
    
    <WapperProduct>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
    </WapperProduct>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <WapperButtonMore textButton='Xem thêm' type='primary' style={{width: '200px', height: '32px', marginTop: '20px'}}/>
    </div>
    <div>
      <NavBarComponent/>
    </div>
    </div>
    </>
  );
};

export default Home;
