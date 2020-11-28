import React, { useState, useEffect } from 'react';
import CourseCard from "./CourseCard";
import axios from 'axios';
import { Grid }  from '@material-ui/core'; 
import MuiAlert from '@material-ui/lab/Alert';

const API_BASE_URL = "http://localhost:3001";
const enpointPrefix = `${API_BASE_URL}/courses`;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CoursesGallery() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setError(false);
            setIsLoading(true);

            axios.get(enpointPrefix)
                .then(response => {
                    setCourses(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setIsLoading(false);
                });
        };

        fetchData();
    }, []);

    if (error) {
        return <Alert severity="warning">{error.message}</Alert>;
    }

      if (isLoading) {
        
      }

    return (
        <Grid>
            {courses.map((course) =>
                <Grid item key={course.id}>
                    <CourseCard course={course} />
                </Grid>
            )}
        </Grid>
    );
}