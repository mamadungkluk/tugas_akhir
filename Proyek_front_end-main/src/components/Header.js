import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../image/toko1.png';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/home">
        <img src={logo} alt="Kedai vape Logo" className="header__logo" />
      </Link>
      <h1 className="header__title">vape shop</h1>
      <button className="header__logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
}

export default Header;
