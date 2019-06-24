import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <React.Fragment>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            color="inherit"
                        >
                            Atlantis Project
                        </Typography>
                        <Button
                            style={{ marginLeft: 'auto' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            href="/login"
                        >
                            Log out
                    </Button>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }
}