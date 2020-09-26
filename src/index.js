
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import CreationForm from "./CreationForm/creationForm"
import Test from "./test"
import Registration from './auth/Registration';
import Login from "./auth/Login";

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/creation" component={CreationForm} />
        <Route path="/test" component={Test} />
        <Route path="/register" component={Registration}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();