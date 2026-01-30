import React from 'react';
import Navbar from '../component/navbar/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      
    </div>
  );
};

export default Root;
