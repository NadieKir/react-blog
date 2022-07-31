import { React, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { AuthContext } from './context'

import Navbar from './UI/navbar/Navbar'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App