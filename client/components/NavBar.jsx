// components/NavBar.js
'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TickerDisplay from './TickerDisplay';
import SearchBar from './SearchBar';
import NavLink from './NavLink';
import styles from '@/styles/NavBar.module.css';

const NavBar = ({ logoSrc, initialStock, navLinks }) => {
  const [currentStock, setCurrentStock] = useState(initialStock);
  const [stockSearch, setStockSearch] = useState('');

  const handleSearchSubmit = (query) => {
    console.log('Search query:', query);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${styles.navbar}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logoSrc} alt="Logo" />
        </a>
        <TickerDisplay currentStock={currentStock} />
        <SearchBar onSearchSubmit={handleSearchSubmit} />
        <div className={`navbar-nav ml-auto ${styles.navbarNav}`}>
          {navLinks.map((link, index) => (
            <NavLink key={index} href={link.href} active={link.active}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
