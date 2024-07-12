import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import Loading from "../../component/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";


const Home = () => {
  const searchProduct = useSelector((state) =>state?.product?.search )
  const searchDebounce = useDebounce(searchProduct,1000)
  const refSearch=useRef()
  const [loading, setLoading] = useState(false)
  const [stateProducts, setStateProducts] = useState([])
  const arr = [
    "VĂN HỌC",
    "KINH TẾ",
    "TÂM LÝ",
    "SÁCH THIẾU NHI",
    "GIÁO KHOA - THAM KHẢO",
  ];
  const fetchProductAll = async (search) => {
    const res =  await ProductService.getAllProduct(search)
    if(search?.length > 0 ||refSearch.current){
      setStateProducts(res?.data)
      return []
    }else{
      return res
    }

  }

  useEffect(() => {
    if(refSearch.current){
      setLoading(true)
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
    setLoading(false)
  },[searchDebounce])

  const {isLoading, data: products} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  })

  useEffect(() => {
    if(products?.data?.length > 0){
      setStateProducts(products?.data)
    }
  },[products])


  const arrImages = [slide1,slide2,slide3,slide4,slide5];

  return (
    <Loading isPending={isLoading || loading}>
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
      {stateProducts?.map((product)=> {
        console.log('products',product)
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
    </Loading>
  );
};

export default Home;
