import React from 'react';
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardMedia, CardActions, CardContent, Button, Typography, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { COURSES } from "../../constants/routes";

const useStyles = makeStyles({
    root: {
        // maxWidth: 500,
        width: 500,
        height: 600,
        margin: 20,
        padding: 5
    },
    media: {
        height: 350
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

const CourseCard = ({ course }) => {

    const classes = useStyles();
    const history = useHistory();

    const navigateToCourseDetails = () => {
        history.push(`${COURSES}/${course.id}`);
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader title={course.title}></CardHeader>
            <CardMedia
                className={classes.media}
                image={course.imagePath}
                title={course.title + "image"}
            />
            <CardContent>
                <div className={classes.flex}>
                    <Typography variant="h6">Price: {course.price.normal} &euro;</Typography>
                    <Typography variant="h6">Early bird: {course.price.early_bird} &euro;</Typography>
                </div>
                <div className={classes.flex}>
                    <Typography variant="h6">Bookable: {course.open && <CheckIcon style={{ color: "#4caf50" }} />}</Typography>
                    <Typography variant="h6">Dates: {course.dates.start_date} - {course.dates.end_date}</Typography>
                </div>
                <Typography variant="h6">Duration: {course.duration}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small" color="primary" onClick={navigateToCourseDetails}>View</Button>
            </CardActions>
        </Card>
    );
}

export default CourseCard;