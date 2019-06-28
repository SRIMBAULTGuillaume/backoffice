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
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const styles = theme => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center'
    },
});

class users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        let self = this;
        fetch('http://10.151.129.35:8080/user/')
            .then(res => res.json())
            .then(users => self.setState({ users: users }))
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid style={{ marginTop: 'auto', marginBottom: 'auto' }} container spacing={4}>
                        <div className={classes.list}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    Users :
                                </Box>
                            </Typography>
                            {this.state.users.map(user => (
                                <List component="nav" aria-label="Main mailbox folders">
                                    <ListItem button>
                                        <ListItemText primary={user.email$javaServer} />
                                        <Divider />
                                    </ListItem>
                                </List>
                            ))}
                        </div>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(users);