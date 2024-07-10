import React, { useEffect, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, Modal, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareTwoTone, UploadOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputConponent/InputConponent';
import { getBase64 } from '../../utils';
import { WapperUploadFile } from './style';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as ProductService from '../../services/ProductService';
import Loading from '../LoadingComponent/Loading';
import * as message from "../../component/Messages/Message";
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rowSelected, setRowSelected] = useState('')

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)

  const [isOpenDrawer,setIsOpenDrawer] = useState(false)

  const [isModalOpenDelete, setIsModalOpenDelete] =useState(false)

  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  });

  const user = useSelector((state) => state?.user)

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  });

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
        const { name, price, description, rating, image, type, countInStock } = data;
        const res =  ProductService.createProduct({name, price, description, rating, image, type, countInStock})
        return res;
  });


  const mutationUpdate = useMutationHooks(
    (data) => {
        const { id, token,...rests } = data;
        const res =  ProductService.updateProduct(id, token,{...rests})
        return res;
  },
);

const mutationDelete = useMutationHooks(
  (data) => {
      const { id, token} = data;
      const res =  ProductService.deleteProduct(id, token)
      return res;
},
);


  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res
  }
  


  const { data, isPending, isSuccess, isError } = mutation;
  const { data:dataUpdated, isPending: isLoadingUpdated, isSuccess:isSuccessUpdated, isError:isErrorUpdated } = mutationUpdate
  const { data:dataDeleted, isPending: isLoadingDeleted, isSuccess:isSuccessDeleted, isError:isErrorDeleted } = mutationDelete

  const queryProduct= useQuery({queryKey:['products'],queryFn: getAllProduct})
  const {isPending: isLoadingProducts, data: products} =queryProduct


  const dataTable = products?.data?.length ? products.data.map(product => ({
    ...product, 
    key: product._id,
  })) : [];

  useEffect(() => { 
    if (isSuccess && data?.status === 'OK'){
      message.success("Thêm sản phẩm thành công!!")
      setIsModalOpen(false)
      handleCancel()
    }else if(isError) {
      message.error("Thêm sản phẩm thất bại!!")
    }
  },[isSuccess])

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

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleDeleteProduct = () => {
    mutationDelete.mutate({id: rowSelected,token: user?.access_token},{
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
      setStateProduct({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
      })
    form.resetFields()
  };
  const handleCancelDrawer = () => {
    setIsOpenDrawer(false)
      setStateProductDetails({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
      })
    form.resetFields()
  };

  const handleOnchange = (e) => {
    setStateProduct({
     ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
     ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    try {
      if (!file.url &&!file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProduct({
       ...stateProduct,
        image: file.preview,
      });
    } catch (error) {
      console.error("Error converting file to base64: ", error);
    }
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    try {
      if (!file.url &&!file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateProductDetails({
       ...stateProductDetails,
        image: file.preview,
      });
    } catch (error) {
      console.error("Error converting file to base64: ", error);
    }
  };


  const fetchDetailsProduct = async (rowSelected) => {
    if (rowSelected) {
      const res = await ProductService.getDetailsProduct(rowSelected);
      if (res?.data) {
        setStateProductDetails({
          name: res?.data?.name,
          price: res?.data?.price,
          description: res?.data?.description,
          rating: res?.data?.rating,
          image: res?.data?.image,
          type: res?.data?.type,
          countInStock: res?.data?.countInStock
        });
      }
      setIsLoadingUpdate(false);
    }
  }

  
  useEffect(()=>{
    form.setFieldsValue(stateProductDetails)
  },[form, stateProductDetails])

  useEffect(() => {
    if(rowSelected) {
      setIsLoadingUpdate(true)
      fetchDetailsProduct(rowSelected)
    }
  },[rowSelected]) 


  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }



  const renderAction = () => { 
    return (
      <div>
        <DeleteOutlined style={{color: 'red', fontSize: '25px', cursor:'pointer'}} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{color: '#4588B5', fontSize: '25px', cursor:'pointer'}} onClick={handleDetailsProduct} />
      </div>
    )
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction

    },
  ];
  const onUpdateProduct = () => {
      mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetails}, {
        onSettled: () => {
          queryProduct.refetch()
        }
      })
  }
  
  console.log('rowSelected', rowSelected)
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{
            height: '150px',
            width: '150px',
            borderRadius: '6px',
            borderStyle: 'dashed',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusSquareTwoTone style={{ fontSize: '70px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
      <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable}
         onRow={(record, rowIndex) => {
          return {
          onClick: event => {
            setRowSelected(record._id)
          },
        };
        }} />
      </div>
      <ModalComponent title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isPending={isLoadingProducts}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input name product!',
                },
              ]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnchange} name='name' />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input type!',
                },
              ]}
            >
              <InputComponent value={stateProduct.type} onChange={handleOnchange} name='type' />
            </Form.Item>
            <Form.Item
              label="Count in Stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input count InStock!',
                },
              ]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name='countInStock' />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input price!',
                },
              ]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name='price' />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input description!',
                },
              ]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnchange} name='description' />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input type!',
                },
            ]}
            >
            <InputComponent value={stateProduct.rating} onChange={handleOnchange} name='rating' />
            </Form.Item>

            <Form.Item
            label="Image"
            name="image"
            rules={[
                {
                required: false,
                message: 'Please input image!',
                },
            ]}
            >
            <WapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </WapperUploadFile>
                    {stateProduct?.image && (
                        <img src={stateProduct?.image} style={{
                        height: '60px',
                        width: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginLeft: '10px',
                        display:'flex'
                        }} alt="avatar"/>
                    )}
            </Form.Item>

            <Form.Item
            wrapperCol={{
                offset: 20,
                span: 16,
            }}
            >
              <div>
            {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
            </div>

            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
                </Form>
            </Loading>
        </ModalComponent>
        <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%">
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
            onFinish={onUpdateProduct}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input name product!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.name} onChange={handleOnchangeDetails} name='name' />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input type!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails} name='type' />
            </Form.Item>
            <Form.Item
              label="Count in Stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input count InStock!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name='countInStock' />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input price!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name='price' />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input description!',
                },
              ]}
            >
              <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name='description' />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input type!',
                },
            ]}
            >
            <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name='rating' />
            </Form.Item>

            <Form.Item
            label="Image"
            name="image"
            rules={[
                {
                required: false,
                message: 'Please input image!',
                },
            ]}
            >
            <WapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </WapperUploadFile>
                    {stateProductDetails?.image && (
                        <img src={stateProductDetails?.image} style={{
                        height: '60px',
                        width: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginLeft: '10px',
                        display:'flex'
                        }} alt="avatar"/>
                    )}
            </Form.Item>

            <Form.Item
            wrapperCol={{
                offset: 20,
                span: 16,
            }}
            >
              <div>
            {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
            </div>

            <Button type="primary" htmlType="submit">
                Apply
            </Button>
            </Form.Item>
                </Form>
            </Loading>
        </DrawerComponent>

      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <Loading isPending={isLoadingDeleted}> 
            <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminProduct