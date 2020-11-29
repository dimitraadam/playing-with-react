import React from "react";
import { makeStyles, AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';  //TODO
import { HOME, COURSES, COURSES_NEW } from "../constants/routes";
import { useHistory } from "react-router-dom";

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
    linkHome: {
        color: "white",      
        fontSize: "1.2em"
    },
    linkRight: {
        margin: 10,
        fontSize: "1.1em"
    },

}));

export default function AppHeader() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.homeTitle}>
                    <Link href={HOME} className={classes.linkHome} style={{ textDecoration: "none" }}>Legendary.Academy Dashboard</Link>
                </Typography>
                <Link href={COURSES} color="inherit" className={classes.linkRight} style={{ textDecoration: "none" }}>Courses</Link>
                <Link href={COURSES_NEW} color="inherit" className={classes.linkRight} style={{ textDecoration: "none" }}>Add new course</Link>
            </Toolbar>
        </AppBar>
    );
}

