import React from 'react'
import { privateRoutes, publicRoutes } from "../router/routes";
import { BrowserRouter, Route, Routes, NavLink, Navigate } from 'react-router-dom'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'
import { useContext } from 'react';
import { AuthContext } from '../context';
import Login from '../pages/Login';
import Loader from '../UI/loader/Loader';

function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route
            element={route.component}
            path={route.path}
            key={route.path}
          />
        )}
        <Route path="*" element={<Navigate replace to="/posts" />} />
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route
            element={route.component}
            path={route.path}
            key={route.path}
          />
        )}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>

  )
}

export default AppRouter