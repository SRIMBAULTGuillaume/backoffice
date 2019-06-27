import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DeviceProfile from './deviceProfile';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const axios = require('axios');

class LinkDeviceToUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            devices: [],
            userId:'',
            deviceId:'',
        }
    }

    componentDidMount() {

    }

    FetchUsers() {
        let self = this;
        fetch('10.151.129.35:8080/user/')
            .then(res => res.json())
            .then(users => self.setState({ users: users }))
    }

    
    AddNewOwner() {
        let self = this;
        fetch('http://10.151.129.35:8080/device/' + this.state.user + '/' + this.state.deviceId + '', {
            method: 'put',
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            })
        })
    }

    FetchDevices() {
        let self = this;
        fetch('10.151.129.35:8080/device')
            .then(res => res.json())
            .then(devices => self.setState({ devices: devices }))
    }

    Login(e) {
        let currentComponent = this;
        const params = {
            'username': this.state.username,
            'password': this.state.password,
        };
        axios.post('http://10.151.129.35:8080/user/login', params, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(function (response) {
                currentComponent.setState((state, props) => {
                    return ({
                        token: response.data
                    });
                })
                localStorage.setItem('token', currentComponent.state.token)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClick() {
        let self = this;
        const params = {

        }

    }

    render() {
        return (
            <div >
            <Paper style={{ textAlign: 'center' }}>

            <Grid container spacing={2}>

                    <Grid item xs={6}>

            Users : 
 
                    
                <Select
                            value={this.state.userId}
                            onChange={this.logChange}
                            inputProps={{
                                name: 'userId',
                                id: 'user-list',
                            }}
                        >
                            {this.state.users.map(user => (
                                <MenuItem value={user.id$javaServer}>{user.email$javaServer}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item  >
                        Devices :
                <Select
                            value={this.state.deviceId}
                            onChange={this.logChange}
                            inputProps={{
                                name: 'deviceId',
                                id: 'device-list',
                            }}
                        >
                            {this.state.devices.map(device => (
                                <MenuItem value={device.id}>{device.type}</MenuItem>
                            ))}
                        </Select>

                          <Grid item><Button variant="contained" color="primary" onClick={this.AddNewOwner.bind(this)}>Link it</Button></Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
        )
    }
}

export default withStyles()(LinkDeviceToUser);