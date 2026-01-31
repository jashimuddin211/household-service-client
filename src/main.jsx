import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layout/Root';
import Home from './component/pages/Home';
import Services from './component/pages/Services';
import AddServices from './component/pages/AddServices';
import Bookings from './component/pages/Bookings';
import Login from './component/pages/Login';
import AuthProvider from './context/AuthProvider';
import Register from './component/pages/Register';
import Profile from './component/Profile.jsx/Profile';



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
      Component:Services,
    },
    {
      path:'/add-service',
      Component:AddServices,
    },
    {
      path:'/bookings',
      Component:Bookings,
    },{
      path:'/login',
      Component:Login,
    },{
      path:'/register',
      Component:Register,
    },{
      Path:'/profile',
      Component:Profile,
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
