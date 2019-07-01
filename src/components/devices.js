import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeviceProfile from './deviceProfile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    table: {
        minWidth: 650,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center'
    },
    paper: {
        maxWidth: 600,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
});

class devices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: [],
            devicesData: [],
            deviceId: '',
            users: [],
            user: '',
            open: false,
            isLoaded: false,
        }
        this.logChange = this.logChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.OnSignOut = this.OnSignOut.bind(this);
    }


    handleDeviceIdClick(e) {
        this.setState({
            deviceId: e.target.id
        })
    }

    OnSignOut() {
        localStorage.clear();
        this.setState({
            username:'',
            password:''
        })
    }

    componentDidMount() {
        let self = this;
        fetch('http://10.151.129.35:8080/device/', {
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json())
            .then(devices => self.setState({ devices: devices, isLoaded: true }))
    }

    logChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick(e) {
        let self = this;
        self.setState({
            deviceId: e.currentTarget.id,
            open: true
        }, () => {
            fetch('http://10.151.129.35:8080/device/' + this.state.deviceId + '', {
                headers: new Headers({
                    'Authorization': localStorage.getItem('token')
                })
            })
                .then(res => res.json())
                .then(devicesData => self.setState({ devicesData: devicesData }))
        })
    };



    handleOpen() {
        // fetch('http://10.151.129.35:8080/device/' + parseInt(this.props.deviceId, 10) + '')
        //     .then(res => res.json())
        //     .then(devicesData => this.setState({ devicesData: devicesData }))
    }

    handleClose() {
        this.setState({ open: false, deviceId: '' })
    }


    render() {

        
        const { classes } = this.props;
        if (!localStorage.getItem('token')) {
            return <React.Fragment><Typography style={{marginLeft:'auto', marginRight:'auto'}}>Bad login</Typography> <Button href="/">Back to login</Button></React.Fragment>
        } else if (!this.state.isLoaded) {
            return <LinearProgress
            />
        } else {
            return (
                <React.Fragment>
                    <div className={classes.root}>
                        <Container className={classes.cardGrid} maxWidth="md">
                            <Grid style={{ marginTop: 'auto', marginBottom: 'auto' }} container spacing={4}>
                                <div className={classes.list}>
                                    <Paper className={classes.paper}>
                                        <Typography component="div">
                                            <Box fontWeight="fontWeightMedium" m={1}>
                                                Devices :
                                        </Box>
                                        </Typography>
                                        <Divider />
                                        {this.state.devices.map(device => (
                                            <List component="nav" aria-label="Main mailbox folders">
                                                <ListItem key={device.id} id={device.id} onClick={this.onClick} button>
                                                    <ListItemText primary={device.id} /> <ListItemText primary={device.type} /> <ListItemText primary={device.macAddress} />
                                                    <DeviceProfile deviceId={this.state.deviceId} devicesData={this.state.devicesData} />
                                                </ListItem>
                                                <Divider />
                                            </List>
                                        ))}
                                    </Paper>
                                </div>
                            </Grid>
                        </Container>
                    </div>
                </React.Fragment>
            )
        };
    }
}

export default withStyles(styles)(devices);