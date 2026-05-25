const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { username, height, weight, age, gender, weeklyGoal, dailyCalorieGoal, weightGoal } = req.body;

    const fieldsToUpdate = {
      username,
      height,
      weight,
      age,
      gender,
      weeklyGoal,
      dailyCalorieGoal,
      weightGoal
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user progress
// @route   GET /api/users/progress
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      progress: {
        totalWorkouts: user.totalWorkouts,
        totalCaloriesBurned: user.totalCaloriesBurned,
        totalMinutes: user.totalMinutes,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        weeklyGoal: user.weeklyGoal,
        badges: user.badges
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};