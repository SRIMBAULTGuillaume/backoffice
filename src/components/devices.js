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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
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
    }


    handleDeviceIdClick(e) {
        this.setState({
            deviceId: e.target.id
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

    // AddNewOwner() {
    //     let self = this;
    //     fetch('http://10.151.129.35:8080/device/' + this.state.user + '/' + this.state.deviceId + '', {
    //         method: 'put',
    //         headers: new Headers({
    //             'Authorization': localStorage.getItem('token')
    //         })
    //     })
    // }

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
            return <React.Fragment><h1>Bad login</h1> <Button href="/login">Back to login</Button></React.Fragment>
        } else if (!this.state.isLoaded) {
            return <LinearProgress
            />
        } else {
            return (
                <React.Fragment>
                    <div>
                        <Container className={classes.cardGrid} maxWidth="md">
                            <Grid style={{ marginTop: 'auto', marginBottom: 'auto' }} container spacing={4}>
                                <div className={classes.list}>
                                    <Typography component="div">
                                        <Box fontWeight="fontWeightMedium" m={1}>
                                            Devices :
                                        </Box>
                                    </Typography>
                                    {this.state.devices.map(device => (
                                        <List component="nav" aria-label="Main mailbox folders">
                                            <ListItem button>
                                                <ListItemText key={device.id} id={device.id} onClick={this.onClick} primary={device.id} /> <ListItemText primary={device.type} /> <ListItemText primary={device.macAddress} />
                                                {/* <Button
                                                    key={device.id} id={device.id} onClick={this.onClick}
                                                    // href={'/device/' + this.state.deviceId}
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Device Stat
                                                </Button> */}
                                                <DeviceProfile deviceId={this.state.deviceId} devicesData={this.state.devicesData} />
                                                {/* <Modal
                                                    aria-labelledby="simple-modal-title"
                                                    aria-describedby="simple-modal-description"
                                                    open={this.state.open}
                                                    onClose={this.handleClose}
                                                >
                                                    <div className={classes.paper}>
                                                        <Typography variant="h6" id="modal-title">
                                                            device Id :{this.state.deviceId}
                                                        </Typography>
                                                        <Typography variant="h6" id="modal-title">
                                                            date  :{this.props.devicesData.date}
                                                        </Typography>
                                                        <Typography variant="h6" id="modal-title">
                                                            value :{this.props.devicesData.value}
                                                        </Typography>
                                                        <Typography variant="h6" id="modal-title">
                                                            value six hours :{this.props.devicesData.valueSixHours}
                                                        </Typography>
                                                        <Button onClick={this.handleClose}>back</Button>
                                                    </div>
                                                </Modal> */}
                                            </ListItem>
                                            <Divider />
                                        </List>
                                    ))}
                                    {/* {this.state.devices.map(device => (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Card className={classes.card}>
                                                <CardContent className={classes.cardContent}>
                                                    <Button><Typography key={device.id} id={device.id} onClick={this.onClick} align='center' gutterBottom variant="h5" component="h2">
                                                        {device.id}
                                                    </Typography>
                                                    </Button>
                                                    <Typography align='center' gutterBottom variant="h5" component="h2">
                                                        {device.type}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <DeviceProfile deviceId={this.state.deviceId} devicesData={this.state.devicesData} />
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))} */}
                                </div>
                                {/* <Divider style={{ margin: '20px' }} />
                                <div className={classes.list}>
                                    <Paper> Users :
                                    {this.state.users.map(user => (
                                            <List component="nav" aria-label="Main mailbox folders">
                                                <ListItem button>
                                                    <ListItemText primary={user.email$javaServer} />
                                                    <Divider />
                                                </ListItem>
                                            </List>
                                        ))}
                                    </Paper>
                                </div> */}
                            </Grid>
                            {/* <Select
                                value={this.state.user}
                                onChange={this.logChange}
                                inputProps={{
                                    name: 'user',
                                    id: 'user-list',
                                }}
                            >
                                {this.state.users.map(user => (
                                    <MenuItem value={user.id$javaServer}>{user.id$javaServer}</MenuItem>
                                ))}
                            </Select> */}
                            {/* <Button onClick={this.AddNewOwner.bind(this)}>Link the device selected to this user</Button> */}
                        </Container>
                        {/* <div style={{ marginTop: 'auto', marginBottom: 'auto' }} >
                            <Paper style={{ textAlign: 'center' }}>
                                Link device to user
                            <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        Users :
                                <Select
                                            value={this.state.user}
                                            onChange={this.logChange}
                                            inputProps={{
                                                name: 'user',
                                                id: 'user-list',
                                            }}
                                        >
                                            {this.state.users.map(user => (
                                                <MenuItem value={user.id$javaServer}>{user.email$javaServer}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item >
                                        Devices :
                                <Select
                                            value={this.state.deviceId}
                                            onChange={this.logChange}
                                            inputProps={{
                                                name: 'deviceId',
                                                id: 'user-list',
                                            }}
                                        >
                                            {this.state.devices.map(device => (
                                                <MenuItem value={device.id}>{device.type}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div> */}
                    </div>
                </React.Fragment>
            )
        };
    }
}

export default withStyles(styles)(devices);