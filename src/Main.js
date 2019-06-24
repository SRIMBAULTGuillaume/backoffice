import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Devices from './components/devices';
import Login from './components/login';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/devices' component={Devices} />
            <Route exact path='/login' component={Login} />
        </Switch>
    </main>
)

export default Main
