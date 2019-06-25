import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
});

class deviceProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            deviceId: this.props.deviceId,
            devicesData: [],
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
        console.log('page number:')
        console.log(this.state.page)
    };

    handleOpen() {
        // fetch('http://10.151.129.35:8080/device/' + parseInt(this.props.deviceId, 10) + '')
        //     .then(res => res.json())
        //     .then(devicesData => this.setState({ devicesData: devicesData }))
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false, deviceId: ''})
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.devicesData);
        return (
            <div>
                <Button  onClick={this.handleOpen} style={{ marginLeft: 'auto', marginRight: 'auto' }} >View</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            device Id :{this.props.deviceId}
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
                </Modal>
            </div >
        )
    }
}

export default withStyles(styles)(deviceProfile);

