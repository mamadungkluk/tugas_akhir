import React from 'react';
import './Navbar.css'; // Import file CSS

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <a className="navbar__link" href="/Home">Add Product</a>
        </li>
        <li className="navbar__item">
          <a className="navbar__link" href="/">Product</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
