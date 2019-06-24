import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const devicesData = [
    {
        id: '1', actual_temperature: '23', given_time_temperature_last_2_hours: '37', average_last_month_temperature: '34'
    },
    {
        id: '2', actual_temperature: '28', given_time_temperature_last_2_hours: '35', average_last_month_temperature: '39'
    },
    {
        id: '3', actual_temperature: '23', given_time_temperature_last_2_hours: '33', average_last_month_temperature: '31'
    },
    {
        id: '4', actual_temperature: '33', given_time_temperature_last_2_hours: '47', average_last_month_temperature: '30.5'
    }
];

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
            devices: []
        }
        this.logChange = this.logChange.bind(this);
    }
    componentDidMount() {
        let self = this;
        fetch('/devices')
            .then(res => res.json())
            .then(devices => self.setState({ devices: devices }));
    }
    logChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    href="/login"
                >
                    Log out
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>device id</TableCell>
                                <TableCell align="center">device actual temperature</TableCell>
                                <TableCell align="center">device last 2 hours temperature</TableCell>
                                <TableCell align="center">device last month avg temperature</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {devicesData.map(device => (
                                <TableRow key={device.id}>
                                    <TableCell align='center' component="th" scope="row">
                                        {device.id}
                                    </TableCell>
                                    <TableCell align='center' component="th" scope="row">
                                        {device.actual_temperature}°
                                    </TableCell>
                                    <TableCell align='center'>{device.given_time_temperature_last_2_hours}°</TableCell>
                                    <TableCell align='center'>{device.average_last_month_temperature}°</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(devices);