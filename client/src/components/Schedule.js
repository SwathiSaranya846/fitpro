import React from 'react';
import { Plus, Dumbbell, Flame, Moon } from 'lucide-react';

export default function Schedule() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Sample schedule data - in real app, this comes from API
  const schedule = {
    0: { label: 'Rest Day', type: 'rest', color: '#71717a' },
    1: { label: 'Rest Day', type: 'rest', color: '#71717a' },
    2: { label: 'Rest Day', type: 'rest', color: '#71717a' },
    3: { label: 'Rest Day', type: 'rest', color: '#71717a' },
    4: { label: 'Rest Day', type: 'rest', color: '#71717a' },
    5: { label: 'Rest Day', type: 'rest', color: '#71717a' },
    6: { label: 'Rest Day', type: 'rest', color: '#71717a' },
  };

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Weekly Schedule</h1>
        <button 
          className="btn"
          style={{ width: 'auto', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} /> Add Workout
        </button>
      </div>

      {/* Today's Date */}
      <div 
        style={{ 
          background: '#141414', 
          padding: '20px 24px', 
          borderRadius: '14px', 
          border: '1px solid #262626',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <p style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '4px' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Today's Workouts ({days[today]})</h2>
        </div>
        <div style={{ padding: '10px 16px', background: '#22c55e20', borderRadius: '10px', color: '#22c55e', fontWeight: '600' }}>
          Rest Day
        </div>
      </div>

      {/* Week Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
        {days.map((day, index) => {
          const isToday = index === today;
          const dayData = schedule[index];
          
          return (
            <div 
              key={index}
              style={{ 
                background: isToday ? '#1e1e1e' : '#141414', 
                padding: '16px', 
                borderRadius: '12px', 
                border: isToday ? '2px solid #6366f1' : '1px solid #262626',
                minHeight: '140px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  fontSize: '15px',
                  color: isToday ? '#6366f1' : '#fff'
                }}>
                  {day}
                </span>
                {isToday && (
                  <span style={{ 
                    background: '#6366f1', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    TODAY
                  </span>
                )}
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {dayData.type === 'rest' ? (
                  <div style={{ textAlign: 'center' }}>
                    <Moon size={24} style={{ color: '#3f3f46', marginBottom: '8px' }} />
                    <p style={{ color: '#3f3f46', fontSize: '13px', fontWeight: '500' }}>Rest Day</p>
                  </div>
                ) : (
                  <div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      color: dayData.color,
                      marginBottom: '4px'
                    }}>
                      <Dumbbell size={14} />
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>Workout</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#71717a' }}>45 min</p>
                    <p style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <Flame size={12} /> ~270 cal
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Empty State */}
      <div 
        style={{ 
          background: '#141414', 
          padding: '40px', 
          borderRadius: '14px', 
          border: '1px solid #262626',
          marginTop: '24px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧘</div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          No workouts scheduled for today
        </h3>
        <p style={{ color: '#71717a', fontSize: '14px' }}>
          Enjoy your rest day! Schedule a workout to get started.
        </p>
      </div>
    </div>
  );
}