import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './pages/login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cadastro from './pages/cadastro'
import Dashboard from './pages/dashboard'
import PrivateRoute from './utils/private-routes';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login />
  },
  {
    path:"/cadastro",
    element:<Cadastro />
  },
  {
    element:<PrivateRoute/>,
    children: [{
      path:"/dashboard",
      element: <Dashboard/>
      }
    ],
    
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)



