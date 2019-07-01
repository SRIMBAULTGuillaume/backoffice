import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
}));


export default function MenuSimple() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> */}
            <IconButton color="inherit" onClick={handleClick} className={classes.button} aria-label="Delete">
                <AddIcon />
            </IconButton>
            {/* </Button> */}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/devices"> <MenuItem onClick={handleClose}>Devices</MenuItem></Link>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/users">  <MenuItem onClick={handleClose}>Users</MenuItem></Link>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/linkToDevice"> <MenuItem onClick={handleClose}>Link device to user</MenuItem></Link>
            </Menu>
        </div>
    );
}