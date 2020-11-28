import React, { useState, useEffect } from 'react';
import Instructor from "./Instructor";
import {  Typography, Grid } from '@material-ui/core';
import axios from 'axios';
import { INSTRUCTORS_ENDPOINT } from "../api/endpoints"; 

const Instructors = ({instructorIds}) => {

    const [instructors, setInstructors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {           
            setError(false);
            try {
                const response = await axios.get(INSTRUCTORS_ENDPOINT);
                setInstructors(response.data);
            } catch (e) {
                setError(e);
            } finally {
            }
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
