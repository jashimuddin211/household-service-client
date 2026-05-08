import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layout/Root';
import Home from './component/pages/Home';


import Bookings from './component/pages/Bookings';
import Login from './component/pages/Login';
import AuthProvider from './context/AuthProvider';
import Register from './component/pages/Register';

import PrivateRoute from './Routes.jsx/PrivateRoute';
import AddService from './component/pages/AddServices';
import Profile from './component/Profile.jsx/Profile';
import AllServices from './component/pages/AllServices';
import ServicesDetails from './component/pages/Services/ServicesDetails';
import MyServices from './component/navbar/MyServices';






const router = createBrowserRouter([
 {
   path: "/",
   Component:Root ,
   children:[
    {
      index:true,

      Component:Home,
    },
    {
      path:'service',
      Component:AllServices,
    },
    {
      path:'serviceDetails/:id',
      Component:ServicesDetails,
    },
    {
      path:'/add-service',
      element:(<PrivateRoute>
        <AddService></AddService>
      </PrivateRoute>)
    },
    {
      path:'/bookings',
      element:(<PrivateRoute>
        <Bookings></Bookings>
      </PrivateRoute>),
    },{
      path:'/login',
      Component:Login,
    },{
      path:'/register',
      Component:Register,
    },{
      path:'/profile',
      element:<Profile></Profile>,
    },
    {
      path:"/myservices",
     element: (<PrivateRoute>
        <MyServices></MyServices>
      </PrivateRoute>),
    }
    
   ]
 },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
