import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>Welcome back, {user?.username || 'User'} 👋</h2>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="navbar-right">
        <div className="avatar">
          {user?.username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <button className="btn-logout-nav" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}