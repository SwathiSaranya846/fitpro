import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { Flame, Timer, TrendingUp, Trophy, Target } from 'lucide-react';

const Dashboard = ({ user, stats, workouts }) => {
  // Handle undefined data
  const totalCalories = stats?.totalCalories || user?.totalCaloriesBurned || 0;
  const totalWorkouts = stats?.totalWorkouts || user?.totalWorkouts || 0;
  const currentStreak = stats?.currentStreak || user?.currentStreak || 0;
  const weeklyGoal = user?.weeklyGoal || 4;
  const weeklyWorkoutsCount = stats?.weeklyWorkouts || 0;

  const weeklyData = stats?.dailyData || [
    { day: 'Mon', duration: 0, calories: 0 },
    { day: 'Tue', duration: 0, calories: 0 },
    { day: 'Wed', duration: 0, calories: 0 },
    { day: 'Thu', duration: 0, calories: 0 },
    { day: 'Fri', duration: 0, calories: 0 },
    { day: 'Sat', duration: 0, calories: 0 },
    { day: 'Sun', duration: 0, calories: 0 },
  ];

  const recentWorkouts = workouts?.slice(0, 5) || [];

  const goalPercentage = Math.min((weeklyWorkoutsCount / weeklyGoal) * 100, 100);

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon blue">
              <Flame size={24} />
            </div>
          </div>
          <div className="stat-label">Total Calories</div>
          <div className="stat-value">{totalCalories.toLocaleString()}</div>
          <div className="stat-change positive">
            <TrendingUp size={14} /> Keep going!
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <Timer size={24} />
            </div>
          </div>
          <div className="stat-label">Workouts</div>
          <div className="stat-value">{totalWorkouts}</div>
          <div className="stat-change positive">
            <TrendingUp size={14} /> Total sessions
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon orange">
              <Target size={24} />
            </div>
          </div>
          <div className="stat-label">Weekly Goal</div>
          <div className="stat-value">{weeklyWorkoutsCount}/{weeklyGoal}</div>
          <div className="progress-container" style={{ marginTop: '10px' }}>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${goalPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon purple">
              <Trophy size={24} />
            </div>
          </div>
          <div className="stat-label">Current Streak</div>
          <div className="stat-value">{currentStreak} days</div>
          <div className="stat-change positive">
            <TrendingUp size={14} /> Best day!
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Activity</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="duration" fill="#3b82f6" name="Minutes" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Calories Trend</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="recent-card">
        <div className="table-header">
          <h3>Recent Workouts</h3>
        </div>
        {recentWorkouts.length === 0 ? (
          <p style={{ color: '#94a3b8', padding: '20px 0', textAlign: 'center' }}>
            No workouts yet. Log your first workout!
          </p>
        ) : (
          <table className="workout-table">
            <thead>
              <tr>
                <th>Workout</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentWorkouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td>{workout.title}</td>
                  <td>
                    <span className={`type-badge ${workout.type}`}>
                      {workout.type}
                    </span>
                  </td>
                  <td>{workout.duration} min</td>
                  <td>{workout.caloriesBurned || 0}</td>
                  <td>{new Date(workout.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;