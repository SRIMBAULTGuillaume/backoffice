import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

const styles = theme => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center'
    },
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
});

class users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        let self = this;
        fetch('http://10.151.129.35:8080/user/')
            .then(res => res.json())
            .then(users => self.setState({ users: users, isLoaded: true }))
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
                <div className={classes.root}>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid style={{ marginTop: 'auto', marginBottom: 'auto' }} container spacing={4}>
                            <div className={classes.list}>
                                <Paper className={classes.paper}>
                                    <Typography component="div">
                                        <Box fontWeight="fontWeightMedium" m={1}>
                                            Users :
                                </Box>
                                    </Typography>
                                    <Divider />
                                    {this.state.users.map(user => (
                                        <Paper className={classes.paper}>
                                            <Grid container>
                                                <Grid item>
                                                    <Avatar>A</Avatar>
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography>{user.email$javaServer}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    ))}
                                </Paper>
                            </div>
                        </Grid>
                    </Container>
                </div>
            )
        }
    }
}

export default withStyles(styles)(users);