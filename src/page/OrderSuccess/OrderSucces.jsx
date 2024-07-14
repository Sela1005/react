import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox, Form, InputNumber, message, Radio } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import {
  Lable,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemsOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRadio,
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
  selectedOrder,
} from "../../redux/slices/orderSlide";
import { convertPrice } from "../../utils";
import ModalComponent from "../../component/ModalComponent/ModalComponent";
import InputComponent from "../../component/InputConponent/InputConponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../component/LoadingComponent/Loading";
import * as OrderService from "../../services/OrderServices";


const OrderSuccess = () => {

  
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  
  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.addres,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);


  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };
  

  
  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      console.log("priceDiscountMemo", total, cur);
      return total + cur.discount * cur.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 100000) {
      return 20000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 10000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    // return priceMemo - priceDiscountMemo + diliveryPriceMemo
    return (
      priceMemo - (priceMemo * priceDiscountMemo) / 100 + diliveryPriceMemo
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);


  const handleAddOrder = () => {
    if(user?.access_token && order?.orderItemSelected && user?.name && user?.address && user?.phone && user?.city
      && priceMemo && user?.id)
      {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemSelected,
          fullName: user?.name,
          phone: user?.phone,
          address:user?.address,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user:user?.id
        }
      ),{
        onSuccess: () => {
          message.success('Đặt hàng thành công')
        }
      }}
    }
    console.log('order', user, order)
    
    const mutationUpdate = useMutationHooks((data) => {
      const { id, token, ...rests } = data;
      const res = UserService.updateUser(id, { ...rests }, token);
      return res;
    });
    const mutationAddOrder = useMutationHooks((data) => {
      const { token, ...rests } = data;
      const res = OrderService.createOrder({ ...rests }, token);
      return res;
    });

    const { isPending, data } = mutationUpdate;
    const {data: dataAdd, isPending: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder;

    useEffect(() => {
      if(isSuccess&& dataAdd?.status === 'OK'){
        message.success('Đặt hàng thành công')
      }else if(isError){
        message.error()
      }
    },[isSuccess,isError])
 
    const handleCancelUpdate = () => {
      setStateUserDetails({
        name: "",
        email: "",
        phone: "",
        isAdmin: false,
      });
      form.resetFields()
      setIsOpenModalUpdateInfo(false)
    };

    const handleUpdateInfoUser = () => {
      const { name, address, city, phone } = stateUserDetails;
      if (name && address && city && phone) {
        mutationUpdate.mutate(
          { id: user?.id, token: user?.access_token, ...stateUserDetails },
          {
            onSuccess: () => {
              dispatch(updateUser({name, address, city, phone}))
              setIsOpenModalUpdateInfo(false)
            },
          }
        );
      }
    };

    
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }
  const handlePayment = (e) => {
    setPayment(e.target.value)
  }
  
  return (
    <Loading isPending={isLoadingAddOrder}>
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>THANH TOÁN</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức giao hàng</Lable>
                <WrapperRadio onChange={handleDilivery} value={delivery}>
                  <Radio value="fast">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      FAST
                    </span>
                    <span> Giao hàng tiết kiệm</span>
                  </Radio>
                  <Radio value="gojeck">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      GO_JECK
                    </span>
                    <span> Giao hàng tiết kiệm</span>
                  </Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperRadio onChange={handlePayment} value={payment} >
                  <Radio value='later_money'>
                    Thanh toán bằng tiền mặt khi nhận hàng
                  </Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {user?.address},{user?.city}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{
                      color: "#4588B5",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
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
                    {convertPrice(priceMemo)}
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
                    {`${priceDiscountMemo} %`}
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
                    {convertPrice(diliveryPriceMemo)}
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
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddOrder()}
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
      <ModalComponent
        forceRender
        title="Cập nhật thông tin giao hàng "
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfoUser}
      >
        <Loading isPending={false}>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 600,
            }}
            // onFinish={onUpdateUser}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name user!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input name city!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.city}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
    </Loading>
  );
};

export default OrderSuccess;
