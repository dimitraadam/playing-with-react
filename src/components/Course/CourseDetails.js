import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import Instructors from "../Instructors";
import { useParams } from "react-router";
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const API_BASE_URL = "http://localhost:3001";
const enpointPrefix = `${API_BASE_URL}/courses`;

export default function CourseDetails() {

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
        <Grid>
            <Typography variant="h4">{course.title}</Typography>
            <img src={course.imagePath} />
            <Typography variant="h6">{course.id}</Typography>
            <Typography variant="h6">Duration: {course.duration}</Typography>
            <Typography variant="body1">{course.description}</Typography>
            <Button variant="contained" color="primary">Edit</Button>
            <Button variant="contained" color="secondary">Delete</Button>
            <Instructors instructorIds={course.instructors} />
        </Grid>
    );
}

