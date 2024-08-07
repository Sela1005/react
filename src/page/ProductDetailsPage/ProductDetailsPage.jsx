import React from "react";
import ProductDetailsComponent from "../../component/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{height: '100vh', width: '100%', background:'#efefef'}}>
      <div
        style={{
          width:'1270px',
          margin: "0 auto",
          backgroundColor: "#f0f0f0",
          height: "100%",
        }}
      >
        <h5>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Trang Chủ
          </span>{" "}
          - Chi tiết sản phẩm{" "}
        </h5>
        <div
          style={{ display: "flex", background: "#fff", borderRadius: "10px" }}
        >
          <ProductDetailsComponent idProduct={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
