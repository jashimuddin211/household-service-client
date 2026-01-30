import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layout/Root';
import Home from './component/pages/Home';



const router = createBrowserRouter([
 {
   path: "/",
   Component:Root ,
   children:[
    {
      index:true,
      Component:Home,
    }
   ]
 },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
