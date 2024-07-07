import React from "react";
import TypeProduct from "../../component/TypeProduct/TypeProduct";
import { WapperButtonMore, WapperProduct, WapperTypeProduct } from "./style";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import slide1 from "../../image/slide1.jpg";
import slide2 from "../../image/slide2.jpg";
import slide3 from "../../image/slide3.jpg";
import slide4 from "../../image/slide4.jpg";
import slide5 from "../../image/slide5.jpg";
import CardComponent from "../../component/CardComponent/CardComponent";
import NavBarComponent from "../../component/NavBarComponent/NavBarComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService"


const Home = () => {
  const arr = [
    "VĂN HỌC",
    "KINH TẾ",
    "TÂM LÝ",
    "SÁCH THIẾU NHI",
    "GIÁO KHOA - THAM KHẢO",
  ];
  const fetchProductAll = async () => {
    const res =  await ProductService.getAllProduct()
    console.log('res', res)
    return res
  }

  const {isLoading, data: products} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  })
  console.log('data', products)



  const arrImages = [slide1,slide2,slide3,slide4,slide5];

  return (
    <>
    <div style={{width: '1270px', margin: '0 auto' }}>
      <WapperTypeProduct>
        {arr.map((item) => (
          <TypeProduct name={item} key={item} />
        ))}
      </WapperTypeProduct>
    </div>
    <div style={{backgroundColor: '#f0f0f0', paddingTop:'10px',padding: "0 120px", height: "2000px"}}>
      <SliderComponent arrImages={arrImages}/>
    
    <WapperProduct>
      {products?.data?.map((product)=> {
        return (
          <CardComponent 
            key={product._id} 
            countInStock={product.countInStock} 
            description={product.description} 
            image= {product.image} 
            name = {product.name}
            price = {product.price}
            rating = {product.rating}
            type={product.type}
            selled = {product.selled}
            discount = {product.discount}
            />
        )
      })}
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
