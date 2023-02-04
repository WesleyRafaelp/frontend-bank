import React, { useState } from 'react';
import { Navigate, Outlet} from 'react-router-dom';

function PrivateRoute() {
    let auth = {token: false}
    
    if(localStorage.token === localStorage.getItem("token")){
        auth = {token: true}
    }
    

    return (
        auth.token ? <Outlet /> : <Navigate to="/" />
    );
};

export default PrivateRoute 