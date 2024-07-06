import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import HeaderComponent from './component/HeaderComponent/HeaderComponent';
import DefaultComponent from './component/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import {jwtDecode}  from "jwt-decode";
import * as UserService from './services/UserService';
import { useDispatch } from 'react-redux';
import { updateUser } from './slices/userSlide';


const App = () => {
  const dispatch = useDispatch();
  // const fetchApi = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/product/get-all`);
  //     return res.data
  //   } catch (error) {
  //     console.error('Error fetching API:', error);
  //   }
  // };
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  // // useEffect(() => {
  // //   fetchApi();
  // // }, []);
  // console.log('query', query)

  // console.log('VITE_SERVER_HOST', import.meta.env.VITE_SERVER_HOST);
  useEffect(() => {
    const {storageData, decoded} = handleDecoded()
        if(decoded?.id) {
          handleGetDetailsUser(decoded?.id, storageData)
        }
  }, [])

  
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    console.log('storageData',storageData,isJsonString(storageData))
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
        decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async function (config) {
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id,token)
    dispatch(updateUser({...res?.data,access_token: token}))
    // console.log('res', res?.data)
    // console.log('access_token',token )
  }

  return (
    
    <div>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          return (
            <Route key={route.path} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
