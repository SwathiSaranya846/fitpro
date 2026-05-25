import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import WorkoutLogger from './components/WorkoutLogger';
import ExerciseLibrary from './components/ExerciseLibrary';
import Schedule from './components/Schedule';
import Profile from './components/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { authAPI, workoutsAPI } from './services/api';

function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.user);
        setAuth(true);
        fetchData();
      } catch (error) {
        console.log('Auth check failed, clearing token');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const [workoutsRes, statsRes] = await Promise.all([
        workoutsAPI.getWorkouts(),
        workoutsAPI.getStats()
      ]);
      setWorkouts(workoutsRes.data.workouts || []);
      setStats(statsRes.data.stats || null);
    } catch (error) {
      console.log('Error fetching data');
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setAuth(true);
      fetchData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const response = await authAPI.register({ username, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setAuth(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuth(false);
    setWorkouts([]);
    setStats(null);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0a0a', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (!auth) {
    return showRegister ? (
      <Register onRegister={handleRegister} onLogin={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={handleLogin} onRegister={() => setShowRegister(true)} />
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard user={user} stats={stats} workouts={workouts} />;
      case 'workout':
        return <WorkoutLogger onWorkoutCreated={fetchData} />;
      case 'library':
        return <ExerciseLibrary />;
      case 'schedule':
        return <Schedule />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} stats={stats} workouts={workouts} />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentPage={page} setCurrentPage={setPage} onLogout={handleLogout} />
      <div className="main">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="main-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;