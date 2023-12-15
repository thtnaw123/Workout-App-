import { createSlice } from "@reduxjs/toolkit";

const initialState = { workout: [], fetchDataFlag: false };

const workoutSlices = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setWorkouts: (state, action) => {
      state.workout = [...action.payload];
      // console.log(state);
    },
    addWorkout: (state, action) => {
      state.workout = [action.payload, ...state.workout];
    },
    deleteWorkout: (state, action) => {
      // const prevWorkouts = state.workout;
      const newWorkouts = state.workout.filter(
        (prev) => prev._id !== action.payload
      );
      console.log(newWorkouts);
      state.workout = [...newWorkouts];
    },
    setDataFlag: (state, action) => {
      state.fetchDataFlag = action.payload;
    },
  },
});

export const workoutReducer = workoutSlices.reducer;
export const { setWorkouts, addWorkout, deleteWorkout, setDataFlag } =
  workoutSlices.actions;
