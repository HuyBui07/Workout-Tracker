const express = require("express");
const { getAllWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout } = require("../controllers/workoutController");

const router = express.Router();

//Get all workouts
router.get("/", getAllWorkouts);

//Get a single workout
router.get("/:id", getSingleWorkout);

//Create a workout
router.post("/", createWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

//Delete a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
