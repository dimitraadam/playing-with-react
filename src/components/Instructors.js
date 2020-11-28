import React, { useState, useEffect } from 'react';
import Instructor from "./Instructor";
import {  Typography, Grid } from '@material-ui/core';
import axios from 'axios';

const Instructors = ({instructorIds}) => {

    const API_BASE_URL = "http://localhost:3001";
    const enpointPrefix = `${API_BASE_URL}/instructors`;

    const [instructors, setInstructors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = () => {
            setError(false);

            axios.get(enpointPrefix)
                .then(response => {
                    setInstructors(response.data);
                })
                .catch(error => {
                    setError(error);
                });
        };

        fetchData();
    }, []);


    return (
        <Grid>
            <Typography variant="h4">Instructors</Typography>           
            {instructors.filter((instructor) => instructorIds?.includes(instructor?.id))
                .map((filteredInstructor) =>
                    <Instructor instructor={filteredInstructor} />
            )}
        </Grid>
    );
}
export default Instructors;
