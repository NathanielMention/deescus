import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import "../../styles/Login.scss";
import "../../styles/ThemeBtn.scss";
import LoginImg from "../../icons/login.svg";
import { useTheme } from "../themeBtn/ThemeContext";
import Wrapper from "../common/Wrapper";

//react function component to Login user
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    return user && user.id && setRedirect(true);
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      username: username,
      password: password,
    };

    dispatch(loginUser(data)).then((response) => {
      if (response.payload.errors) {
        setErrors(response.payload.errors);
      }
      if (response.payload.status === "unauth") {
        setErrors(true);
      }
    });
  }
  const themeState = useTheme();
  if (redirect) return <Redirect to="/" />;
  return (
    <>
      <Wrapper>
        <div className="baseContainer">
          <LoginImg className="loginImg" />
          <div className="content">
            <form className="form" onSubmit={handleSubmit} autoComplete="off">
              <div className="toggle-container">
                <span style={{ color: "slateblue" }}>☾</span>
                <span className="toggle">
                  <input
                    onChange={() => themeState.toggle()}
                    id="checkbox"
                    className="checkbox"
                    type="checkbox"
                  />
                  <label htmlFor="checkbox" />
                </span>
                <span style={{ color: "yellow" }}>☀︎</span>
              </div>
              <h2 className="header">Login</h2>
              {errors && <div>The username or Password is wrong</div>}
              <TextInput
                className="formGroup"
                name="username"
                label="Username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextInput
                className="formGroup"
                name="passwprd"
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleSubmit} type="submit" className="btn">
                Login
              </button>
              <Link
                className="footer"
                to={"/register"}
              >{`Don't Have An Account?`}</Link>
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
