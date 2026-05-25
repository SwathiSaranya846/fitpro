const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio', 'Full Body', 'Other'],
    required: true
  },
  muscleGroup: {
    type: String,
    enum: ['Pectorals', 'Latissimus Dorsi', 'Trapezius', 'Deltoids', 'Biceps', 'Triceps', 'Forearms', 'Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Abs', 'Full Body'],
  },
  equipment: {
    type: String,
    enum: ['None', 'Barbell', 'Dumbbell', 'Kettlebell', 'Cable', 'Machine', 'Resistance Band', 'Pull-up Bar', 'Cardio Machine', 'Other'],
    default: 'None'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  instructions: { type: String },
  tips: [{ type: String }],
  videoUrl: { type: String },
  imageUrl: { type: String },
  caloriesPerHour: { type: Number, default: 300 },
  isPrimary: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exercise', ExerciseSchema);