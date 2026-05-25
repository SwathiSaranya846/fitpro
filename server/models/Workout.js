const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Workout Details
  title: {
    type: String,
    required: [true, 'Please provide a workout title'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'CrossFit', 'Running', 'Cycling', 'Swimming', 'Sports', 'Other'],
    required: true
  },
  intensity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  // Duration & Calories
  duration: {
    type: Number,
    required: [true, 'Please provide duration in minutes'],
    min: 1
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  // Heart Rate (Optional)
  avgHeartRate: { type: Number },
  maxHeartRate: { type: Number },
  // Exercises performed
  exercises: [{
    name: { type: String, required: true },
    sets: { type: Number, default: 0 },
    reps: { type: Number, default: 0 },
    weight: { type: Number, default: 0 }, // in kg
    duration: { type: Number, default: 0 }, // in seconds
    notes: { type: String }
  }],
  // Timing
  date: {
    type: Date,
    default: Date.now
  },
  startTime: { type: String },
  endTime: { type: String },
  // User Feedback
  feeling: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  notes: { type: String },
  // Completion Status
  completed: { type: Boolean, default: true },
  // Location
  location: { type: String },
  // Equipment Used
  equipment: [{ type: String }]
}, {
  timestamps: true
});

// Index for faster queries
WorkoutSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Workout', WorkoutSchema);