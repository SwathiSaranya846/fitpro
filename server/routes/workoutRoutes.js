const express = require('express');
const router = express.Router();
const { 
  createWorkout, 
  getWorkouts, 
  getWorkout,
  updateWorkout, 
  deleteWorkout,
  getStats 
} = require('../controllers/workoutController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createWorkout)
  .get(protect, getWorkouts);

router.route('/stats')
  .get(protect, getStats);

router.route('/:id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;