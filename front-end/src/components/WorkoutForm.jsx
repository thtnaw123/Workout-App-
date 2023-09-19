import React, { useState } from "react";
import "./workout.css";
import client from "../api/axios";
import { useDispatch } from "react-redux";
import { addWorkout } from "../features/Workout/WorkoutSlice";
// import axios from "axios";
const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoads] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const dispatch = useDispatch();

  const workout = { title, reps, load };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("", workout);
      dispatch(addWorkout(workout));
      console.log(response);
      setTitle("");
      setReps("");
      setLoads("");
      setError(response.error);
      setEmptyFields(emptyFields);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="enter reps"
          // required
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <input
          type="number"
          placeholder="enter loads"
          value={load}
          onChange={(e) => setLoads(e.target.value)}
        />

        <input type="submit" />
      </form>
      <p>{error}</p>
    </div>
  );
};

export default WorkoutForm;
