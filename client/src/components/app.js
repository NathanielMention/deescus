import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/actions/userActions";
import { postMessage } from "../redux/actions/chatActions";
import socket from "../config/socketConfig";
import "../styles/App.scss";

//pages for app
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import Profile from "./profile/Profile";
import PageNotFound from "./PageNotFound";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          return user && user.id ? children : <Redirect to="/login" />;
        }}
      />
    );
  }

  useEffect(() => {
    socket.on("receive message", (data) => {
      dispatch(postMessage(data));
    });
  }, []);

  useEffect(() => {
    dispatch(getUser());
    return () => {};
  }, []);
  return (
    <div className="container">
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
