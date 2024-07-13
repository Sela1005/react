import React, { useEffect, useState } from "react";
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
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../component/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const Home = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    console.log("context", context);
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const {
    isLoading,
    data: products,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const arrImages = [slide1, slide2, slide3, slide4, slide5];

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []); // Thêm mảng phụ thuộc trống để chỉ gọi hàm fetchAllTypeProduct một lần khi component mount

  return (
    <Loading isPending={isLoading || loading}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WapperTypeProduct>
          {typeProducts.map((item) => {
            return(
            <TypeProduct name={item} key={item} />
          )
          })}
        </WapperTypeProduct>
      </div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          paddingTop: "10px",
          padding: "0 120px",
          height: "2000px",
        }}
      >
        <SliderComponent arrImages={arrImages} />
        <WapperProduct>
          {products?.data?.map((product) => {
            return (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
                id={product._id}
              />
            );
          })}
        </WapperProduct>
        <div
          disabled={products?.total === products?.data?.length}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WapperButtonMore
            textButton="Xem thêm"
            type="primary"
            style={{ width: "200px", height: "32px", marginTop: "20px" }}
            onClick={() => setLimit((prev) => prev + 5)}
            disabled={products?.total === products?.data?.length}
          />
        </div>
        <div>
          <NavBarComponent />
        </div>
      </div>
    </Loading>
  );
};

export default Home;
