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
    },
    
   ]
 },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
