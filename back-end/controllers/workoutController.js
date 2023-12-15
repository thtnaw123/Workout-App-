const workOutModel = require("../models/workoutModel");
const mongoose = require("mongoose");
const Joi = require("joi");

//get all work out

const getAllWorkOuts = async (req, res) => {
  // console.log(req.user._id);
  if (mongoose.Types.ObjectId.isValid(req.user._id)) {
    const workouts = await workOutModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(workouts);
  }
};

//add new work out
const createWorkouts = async (req, res) => {
  const { error, value } = validateForm(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const { title, reps, load } = req.body;
  const userId = req.user._id;

  console.log(req.user);

  try {
    const workout = await workOutModel.create({ title, reps, load, userId });
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

const validateForm = (workoutInp) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    reps: Joi.number().min(1).required(),
    load: Joi.number().required(),
  });

  return schema.validate(workoutInp);
};

module.exports = {
  getAllWorkOuts,
  getSingleWorkOut,
  createWorkouts,
  deleteWorkout,
  updateWorkOut,
};
