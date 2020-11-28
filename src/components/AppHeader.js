import React from "react";
import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';  //TODO

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white",
        height: 60,
    },
    homeTitle: {
        flexGrow: 1
    },
    homebutton:{
        color:"white", 
        fontSize:"1.2em"
    }
}));

export default function AppHeader() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.homeTitle}>
                    <Button href="/" style={{color:"white", fontSize:"1.2em"}}>Legendary.Academy Dashboard</Button>
                </Typography>
                <Button href="/courses" color="inherit">Courses</Button>
                <Button href="/courses/new" color="inherit">Add new course</Button>
            </Toolbar>
        </AppBar>    
    );
}   