import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
const axios = require('axios');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
});

class LinkDeviceToUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            users: [],
            devices: [],
            userId: '',
            deviceId: '',
        }
    }

    componentDidMount() {
    }

    FetchDevices() {
        let self = this;
        fetch('http://10.151.129.35:8080/device', {
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json())
            .then(devices => self.setState({ devices: devices }))
    }

    FetchUsers(e) {
        let self = this;
        fetch('http://10.151.129.35:8080/user/')
            .then(res => res.json())
            .then(users => self.setState({ users: users }))
    }

    AddNewOwner() {
        let self = this;
        axios.post('http://10.151.129.35:8080/device/' + self.state.userId + '/' + self.state.deviceId + '')
            .then(function (response) {
                self.setState((state, props) => {
                    return ({
                        isLoaded: true,
                        error: false,
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
                self.setState((state, props) => {
                    return ({
                        error: true,
                    })
                })
            });
    }

    logChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container
                        alignContent="flex-start"
                        direction="row"
                        justify="center"
                        alignItems="stretch">
                        <Grid item xs={6} sm={3}><Typography variant="subtitle1" gutterBottom>
                            Link device with user
                            </Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            Users :
                            <Select
                                onClick={this.FetchUsers.bind(this)}
                                value={this.state.userId}
                                onChange={this.logChange.bind(this)}
                                inputProps={{
                                    name: 'userId',
                                    id: 'user-list',
                                }}
                            >
                                {this.state.users.map(user => (
                                    <MenuItem id={user.id$javaServer} value={user.id$javaServer}>{user.email$javaServer}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            Devices :
                        <Select
                                onClick={this.FetchDevices.bind(this)}
                                value={this.state.deviceId}
                                onChange={this.logChange.bind(this)}
                                inputProps={{
                                    name: 'deviceId',
                                    id: 'device-list',
                                }}
                            >
                                {this.state.devices.map(device => (
                                    <MenuItem id={device.id} value={device.id}>{device.type}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={8} sm={1}>
                            {this.state.isLoaded ? <React.Fragment><OfflinePinIcon style={{ color: 'blue', marginTop: '5px', display: 'inline-block' }} /> Device Linked</React.Fragment> : <Button size="medium" color="primary" onClick={this.AddNewOwner.bind(this)}>Link it</Button>}
                        </Grid>
                    </Grid>
                    <Divider />
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(LinkDeviceToUser);