const workOutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all work out

const getAllWorkOuts = async (req, res) => {
  const workouts = await workOutModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//add new work out
const createWorkouts = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await workOutModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout

const getSingleWorkOut = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workouts" });
  }
  const targetWorkout = await workOutModel.findById(id);

  if (!targetWorkout) {
    return res.status(400).json({ error: "no workout with that id" });
  }
  res.status(200).json(targetWorkout);
};

//update a single workout

const updateWorkOut = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ error: "no such workout" });
  }

  const targetWorkout = await workOutModel.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!targetWorkout) {
    return res.status(404).json({ error: "no such work out" });
  }
  res.status(200).json(targetWorkout);
};

// delete a single workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such workout" });
  }

  const targetWorkout = await workOutModel.findOneAndDelete({ _id: id });

  if (!targetWorkout) {
    return res.status(400).json({ error: "no workout with that id" });
  }
  res.status(200).json(targetWorkout);
};

module.exports = {
  getAllWorkOuts,
  getSingleWorkOut,
  createWorkouts,
  deleteWorkout,
  updateWorkOut,
};
