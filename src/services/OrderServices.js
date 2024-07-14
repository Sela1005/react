// export const createProduct = async (data) => { 
//     const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/product/create`,data)
//     return res.data
// }

import { axiosJWT } from "./UserService";

export const createOrder = async ( data,access_token) => { 
    const res = await axiosJWT.post(`${import.meta.env.VITE_SERVER_HOST}/order/create`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
