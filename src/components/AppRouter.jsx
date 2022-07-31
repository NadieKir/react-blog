import { React, useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { privateRoutes, publicRoutes } from "../router/routes";
import { AuthContext } from '../context';
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