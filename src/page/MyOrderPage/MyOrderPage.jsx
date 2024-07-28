import { useQuery } from "@tanstack/react-query";
import React from "react";
import * as OrderService from "../../services/OrderServices";
import Loading from "../../component/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { WrapperHeader } from "./style";
import TableComponent from "../../component/TableComponent/TableComponent";
import { convertPrice } from "../../utils";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderbyUserId(user?.id, user?.access_token);
    return res.data;
  };

  const { isPending, data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchMyOrder,
    enabled: !!user?.id && !!user?.access_token,
  });

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name",},
    { title: "Số lượng", dataIndex: "amount" },
    { title: "Giảm giá", dataIndex: "discount" },
    { title: "Giá", dataIndex: "price", },


  ];

  const headers = [
    { label: "Tên sản phẩm", key: "name" },
    { label: "Giá", key: "price" },
    { label: "Số lượng", key: "amount" },
  ];

  const dataTable = orders?.orderItems?.length
    ? orders?.orderItems?.map((data) => {
      console.log('orders',orders)
      return{
        ...data,
        key: data._id,
        price: convertPrice(data?.price),
      }})
    : [];
  return (
    <Loading isPending={isPending}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperHeader>Đơn hàng của tôi</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          headers={headers}
          columns={columns}
          data={dataTable}
        />
      </div>
      </div>
    </Loading>
  );
};

export default MyOrderPage;
