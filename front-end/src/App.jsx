import Combine from "./components/Combine";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import PagesLayout from "./Layout/PagesLayout";
import { useSelector } from "react-redux";
import { selectUser } from "./features/Auth/AuthSlice";
import PrivateRoute from "./PrivateRoute/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PagesLayout />}>
      <Route element={<PrivateRoute />}>
        <Route index element={<Combine />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  const user = useSelector(selectUser);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
