import React from "react";
import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';  //TODO
import { HOME, COURSES, COURSES_NEW} from "../constants/routes";
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
    homebutton:{
        color:"white", 
        fontSize:"1.2em"
    }
}));

export default function AppHeader() {
    const classes = useStyles();
    const history = useHistory();

    const navigateToHome = () => {
        history.push(HOME);
    }
    const navigateToCourses = () => {
        history.push(COURSES);
    }
    const navigateToCourseForm = () => {
        history.push(COURSES_NEW);
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.homeTitle}>
                    <Button onClick={navigateToHome} style={{color:"white", fontSize:"1.2em"}}>Legendary.Academy Dashboard</Button>
                </Typography>
                <Button onClick={navigateToCourses} color="inherit">Courses</Button>
                <Button onClick={navigateToCourseForm} color="inherit">Add new course</Button>
            </Toolbar>
        </AppBar>    
    );
}   