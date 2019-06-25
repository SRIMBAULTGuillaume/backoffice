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


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

class devices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: [],
            devicesData: [],
            deviceId: '',
        }
        this.logChange = this.logChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        let self = this;
        fetch('http://10.151.129.35:8080/device/')
            .then(res => res.json())
            .then(devices => self.setState({ devices: devices }))
        fetch('http://10.151.129.35:8080/device/' + parseInt(this.props.deviceId, 10 + ''))
            .then(res => res.json())
            .then(devicesData => self.setState({ devicesData: devicesData }))
    }
    logChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick(e) {
        this.setState({ deviceId: e.target.id })
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.deviceId);
        console.log(this.state.devices);
        console.log(this.state.devicesId);
        return (
            <React.Fragment>
                <div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid style={{ marginTop: 'auto', marginBottom: 'auto' }} container spacing={4}>
                            {this.state.devices.map(device => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography key={device.id} id={device.id} onClick={this.onClick} align='center' gutterBottom variant="h5" component="h2">
                                                {device.id}
                                            </Typography>
                                            <Typography align='center' gutterBottom variant="h5" component="h2">
                                                {device.type}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <DeviceProfile deviceId={this.state.deviceId} devicesData={this.state.devicesData} />
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(devices);