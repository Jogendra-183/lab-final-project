 import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar" data-animate="fade-down">
      <div className="nav-logo" data-animate="fade-right">
        <NavLink to="/">ArtConnect</NavLink>
      </div>

      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} data-animate="fade-up">Home</NavLink>
        <NavLink to="/exhibition" className={({ isActive }) => (isActive ? 'active' : '')} data-animate="fade-up">Exhibition</NavLink>
        <NavLink to="/visitor-dashboard" className={({ isActive }) => (isActive ? 'active' : '')} data-animate="fade-up">Gallery</NavLink>

        {isAuthenticated && user?.role === 'artist' && (
          <NavLink to="/artist-dashboard" className={({ isActive }) => (isActive ? 'active' : '')} data-animate="fade-up">My Dashboard</NavLink>
        )}
        {isAuthenticated && user?.role === 'curator' && (
          <NavLink to="/curator-dashboard" className={({ isActive }) => (isActive ? 'active' : '')} data-animate="fade-up">My Dashboard</NavLink>
        )}

        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')} data-animate="fade-up">Contact</NavLink>

        <div className="nav-auth" data-animate="fade-left">
          {isAuthenticated ? (
            <>
              <span style={{color: 'var(--secondary-text-color)', alignSelf: 'center'}}>Hi, {user.fullName}</span>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
