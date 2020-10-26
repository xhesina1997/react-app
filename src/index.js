import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./home";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import CreationForm from "./CreationForm/creationForm";
import Registration from "./auth/Registration";
import Users from "./UserActions/users";
import Login from "./auth/Login";
import UserProfile from "./UserActions/userProfile";
import PrintedFrom from "./FormToBePrinted/printedForm";
import axios from "axios";
import {browserHistory,hashHistory} from 'react-router';
import Raports from "./Raports/raport";

function SecuredRoute(props) {
  return (
    
    <Route
      exact
      path={props.path}
      render={(data) =>
        
        localStorage.getItem("token") != null ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/login" }}></Redirect>
        )
      }
    ></Route>
  );
}
function LoginRouter(props) {
  return (
    
    <Route
      exact
      path={props.path}
      render={(data) =>
        
        localStorage.getItem("token") == null || localStorage.getItem("token") === "" ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}
const routing =   (
 
  <Router>
    <div>
      <SecuredRoute path="/" component={Home} />
      <SecuredRoute path="/register" component={Registration} />
      <SecuredRoute path="/users" component={Users} />
      <SecuredRoute path="/print" component={PrintedFrom} />
      <SecuredRoute path="/profile" component={UserProfile} />
      <SecuredRoute path="/reports" component={Raports} />
      <LoginRouter path = "/login"component={Login} />
    </div>
  </Router>
);
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers.Authorization = token;
  return config;
});
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
