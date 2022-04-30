import React from "react";
import { Redirect } from "react-router-dom";
import "../../styles/Navbar.scss";
import "../../styles/Profile.scss";
import { useTheme } from "../themeBtn/ThemeContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  const user = useSelector((state) => state.user);

  const handleChange = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      const response = await fetch(
        `http://localhost:5000/search?q=${e.target.value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const parseResponse = await response.json();
      setUsers(parseResponse);
    } else {
      setUsers([]);
    }
  };
  const themeState = useTheme();
  if (isRedirecting) return <Redirect to="/profile" />;
  return (
    <nav className="navbar">
      <div className="logo">Deescus</div>
      <div className="liWrapper">
        <input
          type="text"
          placeholder="Search Users"
          value={searchTerm}
          onChange={handleChange}
          className="formCenter"
        />
        <ul className="searchList">
          {users.map((user, index) => (
            <li className="searchItems" key={index}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
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
      <button onClick={() => setIsRedirecting(true)} className="imgCrop">
        <img className="profilePic" src={user.user ? user.user.avatar : ""} />
      </button>
    </nav>
  );
};

export default Navbar;
