import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import atlantisLogo from '../images/algeco_logo.jpg';
import qs from 'qs';

const axios = require('axios')


const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${atlantisLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
        }
        this.Login = this.Login.bind(this);
    }

    handleChangeUsername(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value
        })
    }

    handleChangePassword(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    Login() {
    // const data = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     data: JSON.stringify(this.state.username, this.state.password ),
    // };
    const data = { 'username': this.state.username,'password': this.state.password };
    const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    data: qs.stringify(data),
    };
        let currentComponent = this;
        axios.post('http://79.94.239.242:8080/user/login', options, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json;charset=UTF-8",
            },
        })
            .then(function (response) {
                currentComponent.setState((state, props) => {
                    return ({
                        token: response.data,
                    });
                })
                localStorage.setItem('token', currentComponent.state.token)
            })
            .catch(function (error) {
                console.log(error);
            });
        // fetch('http://10.151.129.35:8080/user/login',
        //     {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         method: "POST",
        //         body: JSON.stringify({ 'username': this.state.user, 'password: this.state.password })
        //     })
        //     .then(function (res) { console.log(res) })
        //     .catch(function (res) { console.log(res) })
    }

    render() {
        console.log(this.state.isAuth);
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} src={atlantisLogo} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                value={this.state.username}
                                label="Email Address"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={this.handleChangeUsername.bind(this)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={this.state.password}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChangePassword.bind(this)}
                            />
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // href="/devices"
                                className={classes.submit}
                                onClick={this.Login}
                            >
                                Log in
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(login);