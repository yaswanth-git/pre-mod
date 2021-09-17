import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Post from './components/post/Post';
import Signup from './components/signup/Signup';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/post">
            <Post/>
        </Route>
        </Switch>
      </Router>
  )
}

export default App;