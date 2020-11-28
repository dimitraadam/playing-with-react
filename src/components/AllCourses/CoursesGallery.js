import React, { useState, useEffect } from 'react';
import CourseCard from "./CourseCard";
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { COURSES_ENDPOINT } from "../../api/endpoints";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} style={{margin:20}}/>;
}

const CoursesGallery = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const response = await axios.get(COURSES_ENDPOINT);
                setCourses(response.data);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <Alert severity="warning">{error.message}</Alert>;
    }

    if (isLoading) {
        return <Typography variant="body1">Loading...</Typography>
    }

    return (
        <Grid container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
        >
            {courses.map((course) =>
                <Grid>
                    <CourseCard course={course} />
                </Grid>
            )}
        </Grid>
    );
}
export default CoursesGallery;