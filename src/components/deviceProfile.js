import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(6),
        outline: 'none',
    },
    modal: {

        position: 'absolute',
        top: '50 %',
        left: '50 %',
        transform: 'translate(-50 %, -50 %)!important'
    }
});

class deviceProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            deviceId: this.props.deviceId,
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchDataFromDevice = this.fetchDataFromDevice.bind(this);
    }

    componentDidMount() {
        this.fetchDataFromDevice();
    }

    fetchDataFromDevice() {
        fetch('http://10.151.129.35:8080/device/' + this.props.deviceId + '', {
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(res => res.json())
            .then(devicesData => this.setState({ devicesData: devicesData }))
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false })
    }

    render() {
        console.log(this.props.devicesData);
        const { classes } = this.props;
        return (
            <div>
                {/* <Button
                    onClick={this.handleOpen}
                    type="submit"
                    variant="contained"
                    color="primary"
                // key={this}
                // id={device.id}
                >
                    Stats
                </Button> */}
                <Button onClick={this.handleOpen} style={{ marginLeft: 'auto', marginRight: 'auto' }} >Stats</Button>
                <Modal
                    disablePortal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={{}} className={classes.paper}>
                        <Typography align='center' gutterBottom variant="h5" component="h2">
                            device Id :{this.props.deviceId}
                        </Typography>
                        {Object.keys(this.props.devicesData).map((key) => (
                            <React.Fragment>
                                <Typography align='center' gutterBottom variant="h5" component="h2" key={key}>
                                    {key} : {this.props.devicesData[key]}
                                </Typography>
                            </React.Fragment>
                        ))}
                        <div>
                            <Typography align='center' gutterBottom variant="h5" component="h2">
                                {/* device type : {device.type} */}
                            </Typography>
                        </div>
                    </div>
                </Modal>
            </div >
        )
    }
}

export default withStyles(styles)(deviceProfile);

