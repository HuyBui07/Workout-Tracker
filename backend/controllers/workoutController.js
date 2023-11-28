const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

//Get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//Get a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ message: "No workout with this id found" });
  }
  res.status(200).json(workout);
};

//Post a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");

  try {
    const newWorkout = await Workout.create({ title, reps, load });
    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(404).json({ error: 'Please fill in the missing fields.', emptyFields});
  }
};

//Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "No such workout" });
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {new: true});

  if (!updatedWorkout) {
    return res.status(404).json({ message: "No workout with this id found" });
  }

  res.status(200).json(updatedWorkout);
}

//Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "No such workout" });
  }

  const deletedWorkout = await Workout.findByIdAndDelete(id);

  if (!deletedWorkout) {
    return res.status(404).json({ message: "No workout with this id found" });
  }

  res.status(200).json(deletedWorkout);
}

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
