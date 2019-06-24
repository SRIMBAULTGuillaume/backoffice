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

const devicesData = [
    { "id": 1, "type": "GPS" },
    { "id": 2, "type": "GPS" },
    { "id": 3, "type": "PRESSURE" },
    { "id": 4, "type": "TEMP" },
    { "id": 8, "type": "TEMP" },
    { "id": 9, "type": "TEMP" },
    { "id": 10, "type": "LED" }
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
            <React.Fragment>
                <div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid style={{ marginTop: 'auto', marginBottom: 'auto' }} container spacing={4}>
                            {devicesData.map(device => (
                                <Grid item key={device} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://source.unsplash.com/random"
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography align='center' gutterBottom variant="h5" component="h2">
                                                {device.type}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" style={{ marginLeft: 'auto', marginRight: 'auto' }} color="primary">
                                                View
                                            </Button>
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