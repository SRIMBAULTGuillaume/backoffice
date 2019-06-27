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


class LinkDeviceToUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            devices: [],
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

    FetchDevices() {
        let self = this;
        fetch('10.151.129.35:8080/device')
            .then(res => res.json())
            .then(users => self.setState({ users: users }))
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
            <React.Fragment>

                <Button>Link this device to this user</Button>

            </React.Fragment>
        )
    }
}

export default withStyles(styles)(LinkDeviceToUser);