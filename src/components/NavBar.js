import React from 'react';
    import { AppBar, Toolbar, Typography } from '@mui/material';
    //import { Link } from 'react-router-dom'; //  Use this if you have React Router

    const NavBar = () => {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Crowd Control System
                    </Typography>
                    {/*
                    <Button color="inherit" component={Link} to="/">Locations</Button>
                    <Button color="inherit" component={Link} to="/alerts">Alerts</Button>
                    */}
                </Toolbar>
            </AppBar>
        );
    };

    export default NavBar;