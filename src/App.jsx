/* eslint-disable import/no-unresolved */
import React from 'react';
import { SidenavProvider } from './components/theme-layout/SidenavContext';
import Body from './components/theme-layout/body';

function App() {
  return (
    <SidenavProvider>
      <Body />
    </SidenavProvider>
  );
}

export default App; 