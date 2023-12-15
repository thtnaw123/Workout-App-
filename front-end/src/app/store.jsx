import { configureStore } from "@reduxjs/toolkit";
import { workoutReducer } from "../features/Workout/WorkoutSlice";
import { authReducer } from "../features/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    workouts: workoutReducer,
    auth: authReducer,
  },
});

export default store;
