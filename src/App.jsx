/* eslint-disable import/no-unresolved */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import { SidenavProvider } from './components/theme-layout/SidenavContext';
import Body from './components/theme-layout/body';
import Login from './components/auth/login';

function App() {
  const location = useLocation()

  if (location.pathname.startsWith('/authorization')) {
    return (
      <>
        <ToastContainer role="alert" theme="dark" />
        <Login />
      </>
    )
  }

  return (
    <SidenavProvider>
      <Body />
    </SidenavProvider>
  );
}

export default App; 