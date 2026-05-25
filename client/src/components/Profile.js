import React, { useState } from 'react';
import { Save, Trophy, Scale, Ruler, Calendar, Star, Unlock, Flame, Timer, Trophy as TrophyIcon } from 'lucide-react';

export default function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || 'User',
    email: user?.email || 'user@example.com',
    height: user?.height || 170,
    weight: user?.weight || 70,
    age: user?.age || 25,
    weeklyGoal: user?.weeklyGoal || 4
  });

  const heightM = form.height / 100;
  const bmi = form.weight && heightM ? (form.weight / (heightM * heightM)).toFixed(1) : 0;
  
  const getBMICategory = (b) => {
    if (b < 18.5) return { label: 'Underweight', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' };
    if (b < 24.9) return { label: 'Normal', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' };
    if (b < 29.9) return { label: 'Overweight', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' };
    return { label: 'Obese', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' };
  };

  const bmiCat = getBMICategory(parseFloat(bmi) || 0);

  const handleSave = () => {
    setIsEditing(false);
  };

  const allBadges = [
    { name: 'First Workout', icon: '🎯', earned: user?.badges?.includes('First Workout') },
    { name: '7 Day Streak', icon: '🔥', earned: user?.badges?.includes('7 Day Streak') },
    { name: '30 Day Streak', icon: '💪', earned: user?.badges?.includes('30 Day Streak') },
    { name: '50 Club', icon: '🏆', earned: user?.badges?.includes('50 Club') },
    { name: 'Calorie Crusher', icon: '⚡', earned: user?.badges?.includes('Calorie Crusher') },
    { name: 'Early Bird', icon: '🌅', earned: user?.badges?.includes('Early Bird') },
  ];

  return (
    <div className="main-content">
      <h1 className="page-title">Profile</h1>

      {/* Header Section */}
      <div className="p-header-section">
        <div className="p-top">
          <div className="p-avatar-lg">
            {form.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="p-info">
            <h2>{form.username}</h2>
            <p>{form.email}</p>
          </div>
          <button 
            className={`btn-edit-p ${isEditing ? 'save' : ''}`}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? <><Save size={18} /> Save</> : <><Unlock size={18} /> Edit</>}
          </button>
        </div>

        {/* Stats Row */}
        <div className="p-stats-grid">
          <div className="p-stat-card">
            <div className="p-stat-icon"><Timer size={22} /></div>
            <div className="p-stat-value">{user?.totalWorkouts || 0}</div>
            <div className="p-stat-label">Workouts</div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-icon"><Flame size={22} /></div>
            <div className="p-stat-value">{user?.currentStreak || 0}</div>
            <div className="p-stat-label">Streak</div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-icon"><Scale size={22} /></div>
            <div className="p-stat-value">{(user?.totalCaloriesBurned || 0).toLocaleString()}</div>
            <div className="p-stat-label">Calories</div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-icon"><TrophyIcon size={22} /></div>
            <div className="p-stat-value">{user?.longestStreak || 0}</div>
            <div className="p-stat-label">Best Streak</div>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="profile-grid">
        {/* Personal Info Card */}
        <div className="profile-card">
          <h3><Scale size={22} /> Personal Info</h3>
          
          <div className="personal-info">
            <div className="info-box">
              <label>Weight</label>
              {isEditing ? (
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => setForm({...form, weight: parseFloat(e.target.value)})}
                />
              ) : (
                <span>{form.weight} kg</span>
              )}
            </div>
            <div className="info-box">
              <label>Height</label>
              {isEditing ? (
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({...form, height: parseFloat(e.target.value)})}
                />
              ) : (
                <span>{form.height} cm</span>
              )}
            </div>
            <div className="info-box">
              <label>Age</label>
              {isEditing ? (
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({...form, age: parseInt(e.target.value)})}
                />
              ) : (
                <span>{form.age} yrs</span>
              )}
            </div>
            <div className="info-box">
              <label>Weekly Goal</label>
              {isEditing ? (
                <input
                  type="number"
                  value={form.weeklyGoal}
                  onChange={(e) => setForm({...form, weeklyGoal: parseInt(e.target.value)})}
                />
              ) : (
                <span>{form.weeklyGoal}/week</span>
              )}
            </div>
          </div>

          {/* BMI Calculator */}
          <div className="bmi-section">
            <h4><Scale size={18} /> BMI Calculator</h4>
            <div className="bmi-display">
              <div 
                className="bmi-result-box"
                style={{ background: bmiCat.bg, border: `2px solid ${bmiCat.color}` }}
              >
                <span className="bmi-value" style={{ color: bmiCat.color }}>{bmi}</span>
                <span className="bmi-category" style={{ color: bmiCat.color }}>{bmiCat.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="profile-card">
          <h3><Trophy size={22} /> Achievements</h3>
          
          <div className="ach-stats">
            <div className="ach-stat">
              <div className="ach-stat-value">{user?.totalWorkouts || 0}</div>
              <div className="ach-stat-label">Total</div>
            </div>
            <div className="ach-stat">
              <div className="ach-stat-value">{user?.currentStreak || 0}</div>
              <div className="ach-stat-label">Streak</div>
            </div>
            <div className="ach-stat">
              <div className="ach-stat-value">{user?.longestStreak || 0}</div>
              <div className="ach-stat-label">Best</div>
            </div>
            <div className="ach-stat">
              <div className="ach-stat-value">{Math.round((user?.totalCaloriesBurned || 0) / 1000)}k</div>
              <div className="ach-stat-label">Calories</div>
            </div>
          </div>

          <h4 style={{ marginBottom: '16px', color: '#a1a1aa' }}>Badges</h4>
          <div className="badges-list">
            {allBadges.map((badge, i) => (
              <div key={i} className={`badge-box ${badge.earned ? '' : 'locked'}`}>
                <span className="badge-emoji">{badge.earned ? badge.icon : '🔒'}</span>
                <div className="badge-info">
                  <h4>{badge.name}</h4>
                  <p>{badge.earned ? '🏆 Earned!' : 'Not yet earned'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}