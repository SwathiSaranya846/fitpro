import React from 'react';
import { Home, Dumbbell, BookOpen, Calendar, User, LogOut } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'workout', label: 'Log Workout', icon: Dumbbell },
  { id: 'library', label: 'Exercise Library', icon: BookOpen },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'profile', label: 'Profile', icon: User },
];

const sidebarStyle = {
  width: '260px',
  height: '100vh',
  background: '#141414',
  position: 'fixed',
  left: 0,
  top: 0,
  borderRight: '1px solid #262626',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '30px',
};

const logoIconStyle = {
  width: '40px',
  height: '40px',
  background: '#6366f1',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '24px',
};

const logoTextStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#6366f1',
};

const navItemsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
};

const navBtnStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '8px',
  background: isActive ? '#6366f1' : 'transparent',
  border: 'none',
  color: isActive ? 'white' : '#a1a1aa',
  fontSize: '15px',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
});

const footerStyle = {
  marginTop: 'auto',
  paddingTop: '20px',
  borderTop: '1px solid #262626',
};

const logoutStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '8px',
  background: 'transparent',
  border: 'none',
  color: '#ef4444',
  fontSize: '15px',
  cursor: 'pointer',
  width: '100%',
};

export default function Sidebar({ currentPage, setCurrentPage, onLogout }) {
  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <div style={logoIconStyle}>⚡</div>
        <span style={logoTextStyle}>FITPRO</span>
      </div>

      <div style={navItemsStyle}>
        {navItems.map((item) => (
          <button
            key={item.id}
            style={navBtnStyle(currentPage === item.id)}
            onClick={() => setCurrentPage(item.id)}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </div>

      <div style={footerStyle}>
        <button style={logoutStyle} onClick={onLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}