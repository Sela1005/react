import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderServices";
import BarChartComponent from "./BarChartComponent";
import { convertPrice } from "../../utils";

const AdminOrder = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const user = useSelector((state) => state?.user);

  //tong doanh thu
  const totalRevenue = async () => {
    const res = await OrderService.totalRevenue(user?.access_token);
    return res;
  };
  const queryRevenue = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: totalRevenue,
  });
  const { isPending: isLoadingtotal, data: dataTotal } = queryRevenue;

  //doanh thu theo thang
  const monthlyRevenue = async () => {
    const res = await OrderService.monthlyRevenue(user?.access_token, 2024);
    return res;
  };
  const queryMonthlyRevenue = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: monthlyRevenue,
  });
  const { isPending: isLoadingMonthly, data: dataMonthly } =
    queryMonthlyRevenue;

// Tạo một mảng 12 phần tử mặc định cho mỗi tháng
const chartData = Array.from({ length: 12 }, (_, index) => {
  const month = index + 1; // Tạo tháng từ 1 đến 12
  // Tìm dữ liệu cho tháng hiện tại trong dataMonthly
  const monthData = dataMonthly?.find(item => item._id.month === month);

  return {
    name: `${month}`, // Tên tháng
    doanhthu: monthData ? monthData.monthlyRevenue : 0, // Doanh thu hoặc 0 nếu không có dữ liệu
    pv: 0, // Giá trị mặc định
    amt: 0, // Giá trị mặc định
  };
});


  return (
    <div>
      <WrapperHeader> Quản lý doanh thu </WrapperHeader>
      <div style={{ height: 100, width: 1000 }}>
        <div style={{ fontSize: "25px", fontWeight: 500 }}>
          TỔNG DOANH THU:
          <span style={{ color: "red" }}>
            {" "}
            {convertPrice(dataTotal?.totalRevenue)}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "10px", display: "flex" }}>
        <span style={{ fontSize: "25px", fontWeight: 500 }}>
          Doanh thu theo tháng: 
        </span>
        <BarChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default AdminOrder;
