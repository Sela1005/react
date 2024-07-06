import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/sign-in`,data,{
        withCredentials: true
    })
    return res.data
}
export const registerUser = async (data) => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/sign-up`,data);
    return res.data
}
export const getDetailsUser = async (id, access_token) => { 
        const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/user/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
}


export const refreshToken = async () => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}


export const logoutUser = async () => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/log-out`)
    return res.data
}
