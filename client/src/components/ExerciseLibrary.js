import React, { useState } from 'react';
import { Search, Dumbbell, Clock, Flame, X } from 'lucide-react';

export default function ExerciseLibrary() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const exercises = [
    { id: 1, name: 'Bench Press', category: 'Chest', difficulty: 'Intermediate', equipment: 'Barbell', calories: 300 },
    { id: 2, name: 'Squat', category: 'Legs', difficulty: 'Intermediate', equipment: 'Barbell', calories: 350 },
    { id: 3, name: 'Deadlift', category: 'Back', difficulty: 'Advanced', equipment: 'Barbell', calories: 400 },
    { id: 4, name: 'Pull Ups', category: 'Back', difficulty: 'Intermediate', equipment: 'None', calories: 250 },
    { id: 5, name: 'Push Ups', category: 'Chest', difficulty: 'Beginner', equipment: 'None', calories: 200 },
    { id: 6, name: 'Dumbbell Curl', category: 'Arms', difficulty: 'Beginner', equipment: 'Dumbbell', calories: 150 },
    { id: 7, name: 'Lunges', category: 'Legs', difficulty: 'Beginner', equipment: 'Dumbbell', calories: 220 },
    { id: 8, name: 'Plank', category: 'Core', difficulty: 'Beginner', equipment: 'None', calories: 180 },
    { id: 9, name: 'Burpees', category: 'Full Body', difficulty: 'Advanced', equipment: 'None', calories: 450 },
    { id: 10, name: 'Kettlebell Swing', category: 'Full Body', difficulty: 'Intermediate', equipment: 'Kettlebell', calories: 320 },
    { id: 11, name: 'Shoulder Press', category: 'Shoulders', difficulty: 'Intermediate', equipment: 'Dumbbell', calories: 200 },
    { id: 12, name: 'Lat Pulldown', category: 'Back', difficulty: 'Intermediate', equipment: 'Machine', calories: 220 },
  ];

  const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body'];

  const filtered = exercises.filter(ex => {
    const matchCat = filter.toLowerCase() === 'all' || ex.category.toLowerCase() === filter.toLowerCase();
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="main-content">
      <h1 className="page-title">Exercise Library</h1>
      
      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div className="search-box" style={{ flex: '1', minWidth: '250px' }}>
          <Search size={18} style={{ color: '#71717a' }} />
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, fontSize: '14px' }}
          />
        </div>
      </div>

      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter ${filter.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
            style={{
              padding: '10px 18px',
              background: filter.toLowerCase() === cat.toLowerCase() ? '#6366f1' : '#141414',
              borderRadius: '20px',
              color: filter.toLowerCase() === cat.toLowerCase() ? 'white' : '#a1a1aa',
              cursor: 'pointer',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: '0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="ex-grid">
        {filtered.map(ex => (
          <div 
            key={ex.id} 
            className="ex-card"
            style={{
              background: '#141414',
              padding: '20px',
              borderRadius: '14px',
              border: '1px solid #262626'
            }}
          >
            <div className="ex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{ex.name}</h4>
              <span 
                className="ex-badge"
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  background: ex.difficulty === 'Beginner' ? 'rgba(34,197,94,0.2)' : ex.difficulty === 'Intermediate' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                  color: ex.difficulty === 'Beginner' ? '#22c55e' : ex.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444'
                }}
              >
                {ex.difficulty}
              </span>
            </div>
            <div 
              className="ex-meta"
              style={{ display: 'flex', gap: '16px', color: '#a1a1aa', fontSize: '13px' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Dumbbell size={14} /> {ex.equipment}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> {ex.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={14} /> {ex.calories} cal/hr
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#71717a' }}>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No exercises found</p>
          <p style={{ fontSize: '14px' }}>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}