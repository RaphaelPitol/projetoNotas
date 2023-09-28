import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { ToastContainer } from 'react-toastify';

export function Routes() {
     const { user } = useAuth();

     return (
          <BrowserRouter>
               {user ? <AppRoutes/> : <AuthRoutes />}
               {<ToastContainer/>}
          </BrowserRouter>
     )
}
