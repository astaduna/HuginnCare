import React from 'react';

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-links">
        <li className="nav-link">
          <a href="/">Forsíða</a>
        </li>
        <li className="nav-item">
          <a href="/reports">Skýrslur</a>
        </li>
        <li className="nav-item">
          <a href="/profile">Notandi</a>
        </li>
      </ul>
    </nav>
  );
}
