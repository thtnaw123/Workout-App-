import React, { useState } from "react";
import "./workout.css";
import client from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, setDataFlag } from "../features/Workout/WorkoutSlice";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoads] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const workout = { title, reps, load };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("", workout);
      dispatch(addWorkout(workout));
      // console.log(response);
      setTitle("");
      setReps("");
      setLoads("");
      setError("");
      dispatch(setDataFlag(true));
    } catch (err) {
      console.error(err.response.data.error);
      setError(err.response?.data.error);
    }
  };
  return (
    <>
      <div className="formContainer">
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
        <p className="errorMsg">{error}</p>
      </div>
    </>
  );
};

export default WorkoutForm;
