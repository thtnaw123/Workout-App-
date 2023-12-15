import React, { useEffect, useState } from "react";
import client from "../api/axios";
import "./workout.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setWorkouts,
  deleteWorkout,
  setDataFlag,
} from "../features/Workout/WorkoutSlice";

const Workout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const workouts = useSelector((state) => state.workouts.workout);
  const dispatch = useDispatch();
  const fetchDataFlag = useSelector((state) => state.workouts.fetchDataFlag);
  // const user = useSelector(selectUser);

  const handleDelete = async (workout) => {
    try {
      const response = await client.delete(`/${workout._id}`);
      dispatch(deleteWorkout(response.data._id));
      // console.log(response);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await client.get();
        dispatch(setWorkouts(response.data));
        // if (response) {
        //   console.log(response.data);
        // }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
    dispatch(setDataFlag(false));
  }, [fetchDataFlag]);
  return (
    <div className="workoutContent">
      <h1>Workout </h1>

      {isLoading ? <h3>Loading...</h3> : null}
      {!error ? (
        workouts.map((workout) => (
          <div
            key={workout._id ? workout._id : workout.title}
            className="unit-workout"
          >
            <div>
              <h2>title: {workout.title}</h2>
              <h3>reps: {workout.reps}</h3>
              <h3>loads: {workout.load}</h3>
            </div>
            <div>
              <button
                onClick={() => {
                  handleDelete(workout);
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h3 style={{ color: "red" }}>
          couldn't get the data <br />
          {error}
        </h3>
      )}
    </div>
  );
};

export default Workout;
