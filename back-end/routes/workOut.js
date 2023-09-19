const express = require("express");
const {
  getAllWorkOuts,
  getSingleWorkOut,
  createWorkouts,
  deleteWorkout,
  updateWorkOut,
} = require("../controllers/workoutController");

const router = express.Router();

//get all work out
router.get("/workout", getAllWorkOuts);

// get a single workout

router.get("/workout/:id", getSingleWorkOut);

//add new work out
router.post("/workout", createWorkouts);

//update a single workout
router.patch("/workout/:id", updateWorkOut);

// delete a single workout
router.delete("/workout/:id", deleteWorkout);

module.exports = router;
