import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { withAuth } from '../components/hoc/withAuth';
import '../styles/styles.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = withAuth(lazy(() => import('../layout/DefaultLayout')));

// Pages
const Login = withAuth(lazy(() => import('../views/pages/login/Login')));
const Register = withAuth(lazy(() => import('../views/pages/register/Register')));
const Page404 = withAuth(lazy(() => import('../views/pages/page404/Page404')));
const Page500 = withAuth(lazy(() => import('../views/pages/page500/Page500')));

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
export default App;
