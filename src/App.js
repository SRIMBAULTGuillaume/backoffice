import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import devices from './components/devices';

function App() {
  return (
    <Router>
      <div>
        <Route
          exact
          path="/login"
          component={Login}
        />
        <Route
          exact
          path="/devices"
          component={devices}
          fallbackUrl="/"
        />
      </div>
    </Router>
  );
}

export default App;
