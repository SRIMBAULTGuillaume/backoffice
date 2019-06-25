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
    // const[open, setOpen] = React.useState(false);

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


    // async handleOpen() {
    //     await this.setState({ open: true }, () => {
    //         fetch('http://10.151.129.35:8080/device/' + parseInt(this.props.deviceId, 10) + '')
    //             .then(res => res.json())
    //             .then(devicesData => this.setState({ devicesData: devicesData }))
    //     })
    // }

    handleOpen() {
        fetch('http://10.151.129.35:8080/device/' + parseInt(this.props.deviceId, 10) + '')
            .then(res => res.json())
            .then(devicesData => this.setState({ devicesData: devicesData }))
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false })
    }

    // deleteUser = (id) => {
    //     let url = `https://contact-browser.herokuapp.com/contact/${id}`;
    //     fetch(url, {method: 'delete'}).then(resp => {
    //          this.fetchData();
    //     });
    // };

    render() {
        const { classes } = this.props;
        console.log(this.state.devicesData);
        return (
            <div>
                <Button onClick={this.handleOpen} style={{ marginLeft: 'auto', marginRight: 'auto' }} >View</Button>
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
                        {/* {this.state.devicesData.map(device => (
                            <div>
                                <Typography key={device.id} id={device.id} onClick={this.onClick} align='center' gutterBottom variant="h5" component="h2">
                                    {device.id}
                                </Typography>
                                <Typography align='center' gutterBottom variant="h5" component="h2">
                                    {device.type}
                                </Typography>
                            </div>
                        ))} */}
                        Metrics 4
                            <Button onClick={this.ClickToFetch}>fetch</Button>
                        <Button onClick={this.handleClose}>back</Button>
                    </div>
                </Modal>
            </div >
        )
    }
}

export default withStyles(styles)(deviceProfile);

