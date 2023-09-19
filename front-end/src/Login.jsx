import { useEffect, useRef, useState } from "react";
import "./index.css";
import axios from "./api/axios";
import useAuth from "./hooks/useAuth";
import { Link } from "react-router-dom";
const LOGIN_URL = "api/user";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setAuth, auth } = useAuth();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // setAuth({ user: user, pwd: pwd });
      // setPwd("");
      // setUser("");
      // console.log("auth ", auth);
      console.log(user, pwd);
      console.log("response ", response);
      setSuccess(true);
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
      {success ? (
        <h1>Sucess</h1>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>SignIn</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">Username:</label>
            <input
              type="text"
              name="user"
              ref={userRef}
              id="user"
              required
              autoComplete="off"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
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
      )}
    </>
  );
};

export default Login;
