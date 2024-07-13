import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, InputNumber } from "antd";
import React, { useState } from "react";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperInputNumber,
  WrapperItemsOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
} from "../../redux/slices/orderSlide";
import { convertPrice } from "../../utils";

const OderPage = () => {
  const order = useSelector((state) => state.order);

  const [listChecked, setListChecked] = useState([]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`);
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };
  console.log("listChecked", listChecked);

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const dispatch = useDispatch();

  const handleStep = (value, info, idProduct) => {
    if (info.type === "up") {
      dispatch(increaseAmount({ idProduct }));
    } else if (info.type === "down") {
      dispatch(decreaseAmount({ idProduct }));
    }
  };
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></Checkbox>
                <span style={{ padding: "10px" }}>
                  Tất cả ({order?.orderItems?.length} sản phẩm)
                </span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                console.log("map", order);
                return (
                  <WrapperItemsOrder>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></Checkbox>
                      <img
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          padding: "10px",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        {/* <WrapperPriceDiscount>
                            {order?.amount}
                          </WrapperPriceDiscount> */}
                        <InputNumber
                          defaultValue={1}
                          min={1}
                          max={100}
                          size="small"
                          value={order?.amount}
                          onStep={(value, info) =>
                            handleStep(value, info, order?.product)
                          }
                        />
                      </WrapperCountOrder>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "red",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemsOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ justifyContent: "start" }}>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {convertPrice(order?.price * order?.amount)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      justifyContent: "space-between",
                      fontWeight: "600",
                    }}
                  >
                    0
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Thuế</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    0
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    0
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "red",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}
                  >
                    321321 đ
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              size={40}
              type="primary"
              style={{
                margin: "10px",
              }}
              styleButton={{
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Mua Hàng"}
              styleTextButton={{
                fontSize: "15px",
                fontWeight: "200",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OderPage;
