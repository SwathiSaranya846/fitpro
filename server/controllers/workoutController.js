const Workout = require('../models/Workout');
const User = require('../models/User');

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
exports.createWorkout = async (req, res) => {
  try {
    const { title, type, intensity, duration, caloriesBurned, exercises, feeling, notes, date } = req.body;

    const workout = await Workout.create({
      user: req.user.id,
      title,
      type,
      intensity,
      duration,
      caloriesBurned,
      exercises,
      feeling,
      notes,
      date: date || Date.now()
    });

    const user = await User.findById(req.user.id);
    user.totalWorkouts += 1;
    user.totalMinutes += duration;
    user.totalCaloriesBurned += caloriesBurned || 0;

    const lastWorkout = await Workout.findOne({ user: req.user.id }).sort({ date: -1 });

    if (lastWorkout) {
      const lastDate = new Date(lastWorkout.date).setHours(0, 0, 0, 0);
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const daysDiff = (currentDate - lastDate) / (1000 * 60 * 60 * 24);

      if (daysDiff === 1) {
        user.currentStreak += 1;
      } else if (daysDiff > 1) {
        user.currentStreak = 1;
      }
    } else {
      user.currentStreak = 1;
    }

    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    const badgeChecks = [
      { name: 'First Workout', condition: user.totalWorkouts === 1 },
      { name: '5 Club', condition: user.totalWorkouts === 5 },
      { name: '10 Club', condition: user.totalWorkouts === 10 },
      { name: '25 Club', condition: user.totalWorkouts === 25 },
      { name: '50 Club', condition: user.totalWorkouts === 50 },
      { name: '7 Day Streak', condition: user.currentStreak === 7 },
      { name: '14 Day Streak', condition: user.currentStreak === 14 },
      { name: '30 Day Streak', condition: user.currentStreak === 30 }
    ];

    badgeChecks.forEach(check => {
      if (check.condition) {
        const alreadyHas = user.badges.some(b => b.name === check.name);
        if (!alreadyHas) {
          user.badges.push({ name: check.name });
        }
      }
    });

    await user.save();

    res.status(201).json({
      success: true,
      workout,
      streak: user.currentStreak
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all workouts
// @route   GET /api/workouts
// @access  Private
exports.getWorkouts = async (req, res) => {
  try {
    const { type, startDate, endDate, limit = 50 } = req.query;

    const query = { user: req.user.id };

    if (type) query.type = type;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const workouts = await Workout.find(query).sort({ date: -1 }).limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    // Make sure user owns workout
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.status(200).json({
      success: true,
      workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Private
exports.updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await workout.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Workout deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get workout stats
// @route   GET /api/workouts/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyWorkouts = await Workout.find({
      user: req.user.id,
      date: { $gte: startOfWeek }
    });

    const weeklyDuration = weeklyWorkouts.reduce((acc, w) => acc + w.duration, 0);
    const weeklyCalories = weeklyWorkouts.reduce((acc, w) => acc + w.caloriesBurned, 0);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyData = days.map(day => {
      const dayWorkouts = weeklyWorkouts.filter(w => days[new Date(w.date).getDay()] === day);
      return {
        day,
        duration: dayWorkouts.reduce((acc, w) => acc + w.duration, 0),
        calories: dayWorkouts.reduce((acc, w) => acc + w.caloriesBurned, 0),
        count: dayWorkouts.length
      };
    });

    res.status(200).json({
      success: true,
      stats: {
        totalWorkouts: user.totalWorkouts,
        totalMinutes: user.totalMinutes,
        totalCalories: user.totalCaloriesBurned,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        weeklyWorkouts: weeklyWorkouts.length,
        weeklyDuration,
        weeklyCalories,
        dailyData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};