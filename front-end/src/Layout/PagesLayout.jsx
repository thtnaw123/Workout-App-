import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { selectUser } from "../features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { logOut, logIn } from "../features/Auth/AuthSlice";
import { setWorkouts } from "../features/Workout/WorkoutSlice";

const PagesLayout = () => {
  const user = useSelector(selectUser);
  let userLocalS;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(setWorkouts([]));
    navigate("/login");
  };

  useEffect(() => {
    userLocalS = JSON.parse(localStorage.getItem("user"));
    if (userLocalS) {
      dispatch(logIn(userLocalS));
    }
  }, []);

  return (
    <>
      <header>
        {user !== null ? (
          <>
            <h3>{user.email}</h3>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="signup">SignUp</NavLink>
          </>
        )}
      </header>
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default PagesLayout;
