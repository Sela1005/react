import React, { useEffect, useRef, useState } from "react";
import { WapperUploadFile, WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusSquareTwoTone, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputConponent/InputConponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import * as message from "../../component/Messages/Message";
import { getBase64 } from "../../utils";
import * as UserService from '../../services/UserService';



const AdminUser = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rowSelected, setRowSelected] = useState('')

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)

  const [isOpenDrawer,setIsOpenDrawer] = useState(false)

  const [isModalOpenDelete, setIsModalOpenDelete] =useState(false)

  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    createdAt: '',
  });

  const user = useSelector((state) => state?.user)

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    createdAt: '',
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHooks(
    (data) => {
        const { id, token,...rests } = data;
        const res =  UserService.updateUser(id,{...rests}, token)
        return res;
  },
);

const mutationDelete = useMutationHooks(
  (data) => {
      const { id, token} = data;
      const res =  UserService.deleteUser(id, token)
      return res;
},
);


  const getAllUser = async () => {
    const res = await UserService.getAllUser();
    console.log('res', res)
    return res
  }
  


  const { data:dataUpdated, isPending: isLoadingUpdated, isSuccess:isSuccessUpdated, isError:isErrorUpdated } = mutationUpdate
  const { data:dataDeleted, isPending: isLoadingDeleted, isSuccess:isSuccessDeleted, isError:isErrorDeleted } = mutationDelete

  const queryUser= useQuery({queryKey:['user'],queryFn: getAllUser})
  const {isPending: isLoadingUsers, data: users} =queryUser


  const dataTable = users?.data?.length ? users.data.map(user => ({
    ...user, 
    key: user._id,
    isAdmin: user.isAdmin ? 'TRUE': 'FALSE',
  })) : [];


  useEffect(() => { 
    if (isSuccessDeleted && dataDeleted?.status === 'OK'){
      message.success("Xóa sản phẩm thành công!!")
      handleCancelDelete()
    }else if(isErrorDeleted) {
      message.error("Xóa sản phẩm thất bại!!")
    }
  },[isSuccessDeleted])

  useEffect(() => { 
    if (isSuccessUpdated && dataUpdated?.status === 'OK'){
      message.success("Cập nhật sản phẩm thành công!!")
      handleCancelDrawer()
    }else if(isErrorUpdated) {
      message.error("Cập nhật sản phẩm thất bại!!")
    }
  },[isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteUser = () => {
    mutationDelete.mutate({id: rowSelected,token: user?.access_token},{
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
      setStateUser({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
      })
    form.resetFields()
  };
  const handleCancelDrawer = () => {
    setIsOpenDrawer(false)
      setStateUserDetails({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
      })
    form.resetFields()
  };

  const handleOnchange = (e) => {
    setStateUser({
     ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
     ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    try {
      if (!file.url &&!file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateUserDetails({
       ...stateUserDetails,
        image: file.preview,
      });
    } catch (error) {
      console.error("Error converting file to base64: ", error);
    }
  };


  const fetchDetailsUSer = async (rowSelected) => {
    if (rowSelected) {
      const res = await UserService.getDetailsUser(rowSelected);
      if (res?.data) {
        setStateUserDetails({
          name: res?.data?.name,
          email: res?.data?.email,
          isAdmin: res?.data?.isAdmin,
        });
      }
      setIsLoadingUpdate(false);
    }
  }

  
  useEffect(()=>{
    form.setFieldsValue(stateUserDetails)
  },[form, stateUserDetails])

  useEffect(() => {
    if(rowSelected) {
      setIsLoadingUpdate(true)
      fetchDetailsUSer(rowSelected)
    }
  },[rowSelected]) 


  const handleDetailsUser = () => {
    setIsOpenDrawer(true)
  }



  const renderAction = () => { 
    return (
      <div>
        <DeleteOutlined style={{color: 'red', fontSize: '25px', cursor:'pointer'}} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{color: '#4588B5', fontSize: '25px', cursor:'pointer'}} onClick={handleDetailsUser} />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });


  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a,b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a,b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      ...getColumnSearchProps('isAdmin')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a,b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      sorter: (a,b) => a.createdAt - b.createdAt,
      ...getColumnSearchProps('createdAt')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction

    },
  ];
  const onUpdateUser = () => {
      mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetails}, {
        onSettled: () => {
          queryUser.refetch()
        }
      })
  }
  return (
    <div>
      <WrapperHeader> Quản lý người dùng </WrapperHeader>
      <div style={{ marginTop: "30px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingUsers}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
      >
        <Loading isPending={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 22,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onUpdateUser}
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input Email!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
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
              label="IsAdmin"
              name="isAdmin"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.isAdmin}
                onChange={handleOnchangeDetails}
                name="isAdmin"
              />
            </Form.Item>

            {/* <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: false,
                  message: "Please input image!",
                },
              ]}
            >
              <WapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </WapperUploadFile>
              {stateUserDetails?.image && (
                <img
                  src={stateUserDetails?.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                    display: "flex",
                  }}
                  alt="avatar"
                />
              )}
            </Form.Item> */}

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <div>
                {dataUpdated?.status === "ERR" && (
                  <span style={{ color: "red" }}>{dataUpdated?.message}</span>
                )}
              </div>

              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        forceRender
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <Loading isPending={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
