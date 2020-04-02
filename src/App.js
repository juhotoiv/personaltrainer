import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import AppBar from './components/AppBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
      </AppBar>
      <Router>
      <div>
        <nav>
          <ul id="menu">
            <li>
              <Link to="/"><Button variant="contained" color="primary">Customer list</Button></Link>
            </li>
            <li>
              <Link to="/trainingslist"><Button variant="contained" color="primary">Trainings list</Button></Link>
            </li>
            <li>
            <Link to="/calendar"><Button variant="contained" color="primary">Calendar</Button></Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/trainingslist">
            <Trainingslist></Trainingslist>
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/">
            <Customerlist></Customerlist>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function Calendar() {
  return <h2>Calendar</h2>;
}

export default App;
