/* eslint-disable import/no-unresolved */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import { SidenavProvider } from './components/theme-layout/SidenavContext';
import Body from './components/theme-layout/Body'
import Login from './components/auth/login'

function App() {
  const location = useLocation();

  return (
    <>
      {/* ✅ ToastContainer mounted globally, never unmounts */}
      <ToastContainer role="alert" theme="dark" />

      {location.pathname.startsWith('/authorization') ? (
        <Login />
      ) : (
        <SidenavProvider>
          <Body />
        </SidenavProvider>
      )}
    </>
  );
}

export default App;
