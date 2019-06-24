import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '35vh',
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: '#3f51b5'
    },
});

class footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div >
                <CssBaseline />
                <footer className={classes.footer}>
                    <Container maxWidth="sm">
                        <Typography style={{ color: 'white' }} align='center'>Algeco</Typography>
                    </Container>
                </footer>
            </div>
        )
    }
}

export default withStyles(styles)(footer);