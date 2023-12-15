import { useEffect, useRef, useState } from "react";
import userAxios from "./api/userAxios";
import { Link } from "react-router-dom";
import "./components/workout.css";
import { logIn } from "./features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  // const [success, setSuccess] = useState(false);

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
      const response = await userAxios.post(LOGIN_URL, userData);
      const token = response?.data?.token;
      const email = response?.data?.email;
      const userId = response?.data?.userId;
      // console.log(response);
      if (token) {
        dispatch(logIn({ token, email, userId }));
      }

      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // console.log(axios.defaults.headers.common["Authorization"]);

      setPwd("");
      setUser("");

      // console.log("response ", response);
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

      console.log(err.message);
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
        <h1>Log-in</h1>
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

          <button type="submit">Login</button>
        </form>

        <Link to="/">back to Home</Link>
      </section>
    </>
  );
};

export default Login;
