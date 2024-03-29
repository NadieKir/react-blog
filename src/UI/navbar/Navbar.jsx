import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context';
import MyButton from '../button/MyButton';

function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth')
  }

  return (
    <div className="navbar">
      {isAuth && <MyButton onClick={logout}>Выйти</MyButton>}
      <NavLink to="/posts">Посты</NavLink>
      <NavLink to="/about">О сайте</NavLink>
    </div>
  )
}

export default Navbar