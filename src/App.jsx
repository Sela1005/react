import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import './main.scss';
import { routes } from './routes';
import HeaderComponent from './component/HeaderComponent/HeaderComponent'
import DefaultComponent from './component/DefaultComponent/DefaultComponent';

const App = () => {
  return (
    <div>
    <Routes>
      {routes.map((route) => {
        const Page = route.page;
        const Layout = route.isShowHeader ?  DefaultComponent : Fragment
        return (
          <Route key={route.page} path={route.path} element={
          <Layout>
            <Page/>
          </Layout>
          } />
        );
      })}
    </Routes>
    </div>
  );
};

export default App;
