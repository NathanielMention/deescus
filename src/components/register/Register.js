import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";
import "../../styles/Register.scss";
import "../../styles/ThemeBtn.scss";
import RegisterImg from "../../icons/register.svg";
import Wrapper from "../common/Wrapper";
import { useTheme } from "../themeBtn/ThemeContext";

//react function component to register user
const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };

    dispatch(registerUser(data)).then((response) => {
      if (response.payload.success) {
        history.push("/login");
      }
      if (response.payload.errors) {
        setErrors(response.payload.errors);
      }
    });
  }

  const themeState = useTheme();

  return (
    <>
      <Wrapper>
        <div className="baseContainer">
          <RegisterImg className="registerImg" />
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
              <h2 className="header">Sign Up</h2>
              {errors.map((error) => (
                <div key={error.msg}>{error.msg}</div>
              ))}
              <TextInput
                name="username"
                label="Username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextInput
                name="passwprd"
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button onClick={handleSubmit} type="submit" className="btn">
                Sign Up
              </button>
              <Link className="footer" to={"/login"}>
                Already Have An Account?
              </Link>
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

Register.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Register;
