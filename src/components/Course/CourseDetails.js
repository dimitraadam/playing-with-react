import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button, Typography, Grid, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Instructors from "../Instructors";
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { COURSES, COURSES_EDIT } from "../../constants/routes";
import { COURSES_ENDPOINT } from "../../api/endpoints";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} style={{margin:20}} />;
}

const useStyles = makeStyles(() => ({
    root: {
        margin: 20,
        width:500
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    media: {
        height: 500,
    },
}));

const CourseDetails = () => {

    const classes = useStyles();
    const history = useHistory();

    const deleteLesson = async () => {
        try {
            await axios.delete(`${COURSES_ENDPOINT}/${id}`);
            alert("Course deleted");
        } catch {
        }
        history.push(COURSES);
    };
    
    const navigateToEdit = () => {
        history.push(`${COURSES_EDIT}/${course.id}`);
    }

    const [course, setCourse] = useState({});
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {

        const fetchData = async () => {
            setError(false);
            try {
                const response = await axios.get(`${COURSES_ENDPOINT}/${id}`);
                setCourse(response.data);
            } catch (e) {
                setError(e);
            } finally {
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <Alert severity="warning">{error.message}</Alert>;
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4">{course.title}</Typography>
            <img src={course.imagePath} className={classes.media} />
            <div className={classes.flex}>
                <Typography variant="h6">Price: {course.price?.normal} &euro;</Typography>
                <Typography variant="h6">Early bird: {course.price?.early_bird} &euro;</Typography>
            </div>
            <div className={classes.flex}>
                <Typography variant="h6">Bookable: {course.open && <CheckIcon style={{ color: "#4caf50" }} />}</Typography>
                <Typography variant="h6">Dates: {course.dates?.start_date} - {course.dates?.end_date}</Typography>
            </div>
            <Typography variant="h6">Duration: {course.duration}</Typography>
            <div dangerouslySetInnerHTML={{ __html: course.description }} />
            <Button variant="contained" color="primary" onClick={navigateToEdit}>Edit</Button>
            <Button variant="contained" color="secondary" onClick={deleteLesson}>Delete </Button>
            <Instructors instructorIds={course.instructors} />
        </div>
    );
}

export default CourseDetails;