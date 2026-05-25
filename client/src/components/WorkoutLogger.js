import React, { useState } from 'react';
import { Plus, Trash2, Save, Flame } from 'lucide-react';

export default function WorkoutLogger({ onWorkoutCreated }) {
  const [workout, setWorkout] = useState({
    title: '',
    type: 'strength',
    intensity: 'medium',
    duration: 45,
    exercises: [],
    notes: ''
  });
  const [newEx, setNewEx] = useState({ name: '', sets: 3, reps: 10, weight: 0 });

  const types = ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'Running', 'Cycling', 'CrossFit'];
  const intensities = ['Low', 'Medium', 'High'];

  const getCalories = () => {
    const rates = { strength: 6, cardio: 10, hiit: 12, yoga: 4, pilates: 5, running: 11, cycling: 8, crossfit: 9 };
    return Math.round(workout.duration * (rates[workout.type] || 5));
  };

  const addExercise = () => {
    if (newEx.name.trim()) {
      setWorkout({...workout, exercises: [...workout.exercises, newEx]});
      setNewEx({ name: '', sets: 3, reps: 10, weight: 0 });
    }
  };

  const removeExercise = (index) => {
    const ex = [...workout.exercises];
    ex.splice(index, 1);
    setWorkout({...workout, exercises: ex});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🎉 "${workout.title}" logged!\n🔥 ~${getCalories()} calories burned`);
    setWorkout({ title: '', type: 'strength', intensity: 'medium', duration: 45, exercises: [], notes: '' });
    if (onWorkoutCreated) onWorkoutCreated();
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Log Workout</h1>
      
      <div className="grid-2">
        <div className="card">
          <h3>New Workout</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Workout Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Morning Upper Body"
                value={workout.title}
                onChange={(e) => setWorkout({...workout, title: e.target.value})}
                required
              />
            </div>

            <div className="row">
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={workout.type}
                  onChange={(e) => setWorkout({...workout, type: e.target.value})}
                >
                  {types.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Intensity</label>
                <select
                  className="form-select"
                  value={workout.intensity}
                  onChange={(e) => setWorkout({...workout, intensity: e.target.value})}
                >
                  {intensities.map(i => <option key={i} value={i.toLowerCase()}>{i}</option>)}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <label className="form-label">Duration (min)</label>
                <input
                  type="number"
                  className="form-input"
                  value={workout.duration}
                  onChange={(e) => setWorkout({...workout, duration: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Est. Calories</label>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '12px', 
                  background: 'rgba(239,68,68,0.15)', 
                  borderRadius: '8px', 
                  color: '#ef4444', 
                  fontWeight: '600',
                  marginTop: '8px'
                }}>
                  <Flame size={18} /> ~{getCalories()}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes (optional)</label>
              <textarea
                className="form-input"
                rows="3"
                placeholder="How did you feel? Any PRs?"
                value={workout.notes}
                onChange={(e) => setWorkout({...workout, notes: e.target.value})}
                style={{minHeight: '80px', resize: 'vertical'}}
              />
            </div>

            <button type="submit" className="btn" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
              <Save size={18} /> Save Workout
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Add Exercises</h3>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Exercise name"
              value={newEx.name}
              onChange={(e) => setNewEx({...newEx, name: e.target.value})}
            />
          </div>
          
          <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
            <div className="form-group" style={{flex: 1}}>
              <label className="form-label">Sets</label>
              <input
                type="number"
                className="form-input"
                value={newEx.sets}
                onChange={(e) => setNewEx({...newEx, sets: parseInt(e.target.value)})}
                style={{textAlign: 'center'}}
              />
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label className="form-label">Reps</label>
              <input
                type="number"
                className="form-input"
                value={newEx.reps}
                onChange={(e) => setNewEx({...newEx, reps: parseInt(e.target.value)})}
                style={{textAlign: 'center'}}
              />
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label className="form-label">Weight</label>
              <input
                type="number"
                className="form-input"
                value={newEx.weight}
                onChange={(e) => setNewEx({...newEx, weight: parseInt(e.target.value)})}
                style={{textAlign: 'center'}}
              />
            </div>
          </div>

          <button 
            type="button" 
            className="btn" 
            onClick={addExercise}
            style={{marginBottom: '20px', background: '#22c55e'}}
          >
            <Plus size={18} /> Add Exercise
          </button>

          <h4 style={{marginBottom: '12px', color: '#aaa'}}>Exercises Added</h4>
          
          <div className="ex-list">
            {workout.exercises.length === 0 ? (
              <div style={{
                textAlign: 'center', 
                padding: '30px', 
                color: '#666',
                background: 'var(--bg3)',
                borderRadius: '10px'
              }}>
                <p>No exercises added yet</p>
                <p style={{fontSize: '12px'}}>Add exercises above to track your sets and reps</p>
              </div>
            ) : (
              workout.exercises.map((ex, i) => (
                <div key={i} className="ex-item">
                  <div>
                    <h4>{ex.name}</h4>
                    <p>{ex.sets} sets × {ex.reps} reps @ {ex.weight}kg</p>
                  </div>
                  <button 
                    className="ex-delete" 
                    onClick={() => removeExercise(i)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '8px'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}