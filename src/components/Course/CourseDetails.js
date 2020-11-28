import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Button, Typography, Grid, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Instructors from "../Instructors";
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const API_BASE_URL = "http://localhost:3001";
const enpointPrefix = `${API_BASE_URL}/courses`;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20
    }
}));

export default function CourseDetails() {

    const classes = useStyles();

    const [course, setCourse] = useState({});
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {

        const fetchData = () => {
            setError(false);

            axios.get(`${enpointPrefix}/${id}`)
                .then(response => {
                    setCourse(response.data);
                })
                .catch(error => {
                    setError(error);
                });
        };

        fetchData();
    }, []);

    if (error) {
        return <Alert severity="warning">{error.message}</Alert>;
    }

    return (
        <Grid className={classes.root}>
            <Typography variant="h4">{course.title}</Typography>
            <img src={course.imagePath} />
            <Typography variant="h6">Price: {course.price?.normal} &euro;</Typography>
            <Typography variant="h6">Early bird: {course.price?.early_bird} &euro;</Typography>
            <Typography variant="h6">Bookable: {course.open && <CheckIcon style={{ color: "#4caf50" }} />}</Typography>
            <Typography variant="h6">Duration: {course.duration}</Typography>
            <Typography variant="h6">Dates: {course.dates?.start_date} - {course.dates?.end_date}</Typography>           
            <div dangerouslySetInnerHTML={{__html: course.description}}/>
            <Button variant="contained" color="primary">Edit</Button>
            <Button variant="contained" color="secondary">Delete</Button>
            <Instructors instructorIds={course.instructors} />
        </Grid>
    );
}

