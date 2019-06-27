import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './App.css';
import Login from './components/login';
import devices from './components/devices';
import Header from './components/header';
import Footer from './components/footer';
import DeviceProfile from './components/deviceProfile';
import users from './components/users';
import LinkDeviceToUser from './components/LinkDeviceToUser';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));


function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Header />
        <Route
          exact
          path="/"
          component={Login}
        />
        <Route
          exact
          path="/devices"
          component={devices}
          fallbackUrl="/"
        />
        <Route
          exact
          path="/users"
          component={users}
          fallbackUrl="/devices"
        />
        <Route
          exact
          path="/device/:deviceId" component={DeviceProfile}
          fallbackUrl="/devices"
        />
        <Route
          exact
          path="/linkToDevice"
          component={LinkDeviceToUser}
          fallbackUrl="/"
        />
        {/* <Footer  /> */}
      </div>
    </Router>
  );
}

export default App;
