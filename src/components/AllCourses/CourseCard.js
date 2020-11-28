import React from 'react';
import { useHistory } from "react-router-dom";
import { Card, CardActions, CardContent, Button, Grid, Typography, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { COURSES } from "../../constants/routes";

const useStyles = makeStyles({
    card: {
        margin: 20,
        padding:5,
        width: 200,
        height: 250,
    },
});


const CourseCard = ({ course }) => {

    const classes = useStyles();
    const history = useHistory();

    const navigateToCourseDetails = () => {
        history.push(`${COURSES}/${course.id}`);
    }
    
    return (
        <Grid item classname={classes.card}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4">{course.title}</Typography>
                    <img src={course.imagePath} />
                    <Typography variant="h6">Price: {course.price.normal} &euro;</Typography>
                    <Typography variant="h6">Early bird: {course.price.early_bird} &euro;</Typography>
                    <Typography variant="h6">Bookable: {course.open && <CheckIcon style={{ color: "#4caf50" }} />}</Typography>
                    <Typography variant="h6">Duration: {course.duration}</Typography>
                    <Typography variant="h6">Dates: {course.dates.start_date} - {course.dates.end_date}</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" color="primary" onClick={navigateToCourseDetails}>View</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}



export default CourseCard;