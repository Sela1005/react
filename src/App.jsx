import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './main.scss';
import { routes } from './routes';
import HeaderComponent from './component/HeaderComponent/HeaderComponent';
import DefaultComponent from './component/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const App = () => {
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
