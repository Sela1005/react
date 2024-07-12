import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search) => { 
    let res = {}
    if(search?.length > 0){
        res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-all?filter=name&filter=${search}`)
    }else{
        res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-all`)
    }
    return res.data
}
export const createProduct = async (data) => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/product/create`,data)
    return res.data
}
export const getDetailsProduct = async (id) => { 
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-details/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => { 
    const res = await axiosJWT.put(`${import.meta.env.VITE_SERVER_HOST}/product/update/${id}`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}

export const deleteProduct = async (id, access_token) => { 
    const res = await axiosJWT.delete(`${import.meta.env.VITE_SERVER_HOST}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}