import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { UserAuthu } from './App'

const useAuth = () => {
    const { user } = useContext(UserAuthu);
    return user && user.loggedIn;
  };

const ProtectedRoutes = () => {
    const logg = useAuth();
    return logg ? (
    <Outlet /> 
    ):(
        <Navigate to="/" />
    ) 
}

export default ProtectedRoutes;