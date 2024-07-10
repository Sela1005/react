import { Table } from "antd";
import React from "react";
import Loading from "../LoadingComponent/Loading";

const TableComponent = (props) => {


  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    columns = [],
  } = props;

  const rowSelection = {
    onchange: (selectionRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRows}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  return (
    <Loading isPending={isLoading}>
    <Table
      rowSelection={{ type: selectionType, ...rowSelection }}
      columns={columns}
      dataSource={data}
      {...props}
    />
    </Loading>
  );
};

export default TableComponent;
