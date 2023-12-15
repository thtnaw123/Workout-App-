import { useEffect, useRef, useState } from "react";
import axios from "./api/userAxios";
import { Link } from "react-router-dom";
import "./components/workout.css";
import { useDispatch } from "react-redux";
import { SignUp } from "./features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const SIGNUP_URL = "signup";

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email: user, password: pwd };
    try {
      const response = await axios.post(SIGNUP_URL, userData);
      const token = response?.data?.accessToken;
      const email = response?.data?.email;

      if (token) {
        dispatch(SignUp({ token, email }));
      }

      setPwd("");
      setUser("");
      console.log("response ", response);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (!err?.response.status === 400) {
        setErrMsg("Missing username or password");
      } else if (!err?.response.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("login failed");
      }
    }
  };
  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user"
            ref={userRef}
            id="user"
            placeholder="email"
            required
            autoComplete="off"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <input
            type="password"
            name="pwd"
            id="pwd"
            placeholder="password"
            required
            autoComplete="off"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />

          <button type="submit">Sign Up</button>
        </form>

        <Link to="/">back to Home</Link>
      </section>
    </>
  );
};

export default Signup;
