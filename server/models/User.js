const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  // Physical Stats
  height: { type: Number, default: 170 }, // cm
  weight: { type: Number, default: 70 },  // kg
  age: { type: Number, default: 25 },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'], 
    default: 'Male' 
  },
  // Goals & Settings
  weeklyGoal: { type: Number, default: 4 },
  dailyCalorieGoal: { type: Number, default: 500 },
  weightGoal: { type: Number, default: 70 },
  // Tracking Stats
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  totalWorkouts: { type: Number, default: 0 },
  totalMinutes: { type: Number, default: 0 },
  totalCaloriesBurned: { type: Number, default: 0 },
  // Achievements
  badges: [{ 
    name: String,
    date: { type: Date, default: Date.now }
  }],
  // Settings
  notifications: {
    workoutReminder: { type: Boolean, default: true },
    streakAlert: { type: Boolean, default: true }
  },
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);