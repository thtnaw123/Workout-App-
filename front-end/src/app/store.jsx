import { configureStore } from "@reduxjs/toolkit";
import { workoutReducer } from "../features/Workout/WorkoutSlice";

export const store = configureStore({
  reducer: {
    workouts: workoutReducer,
  },
});

export default store;
