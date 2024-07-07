import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import HeaderComponent from './component/HeaderComponent/HeaderComponent';
import DefaultComponent from './component/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import {jwtDecode}  from "jwt-decode";
import * as UserService from './services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './slices/userSlide';
import Loading from './component/LoadingComponent/Loading';


const App = () => {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const {storageData, decoded} = handleDecoded()
        if(decoded?.id) {
          handleGetDetailsUser(decoded?.id, storageData)
        }
    setIsLoading(false)

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
  }

  return (
    <div>
      <Loading isPending={isLoading} style={{background: 'red'}}>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route key={route.path} path={isCheckAuth? route.path:undefined} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            );
          })}
        </Routes>
      </Loading>
    </div>
  );
};

export default App;
