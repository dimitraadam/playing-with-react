import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Grid, makeStyles, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';
import { COURSES } from "../../constants/routes";
import { COURSES_ENDPOINT } from "../../api/endpoints";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    block: {
        margin: 20
    },
    btn: {
        float: "right",
        marginTop: 20,
        marginRight: 60
    }
});

export default function CoursesList() {
    const classes = useStyles();
    const history = useHistory();

    // const navigateToCourseDetails = (courseId) => {
    //     history.push(`${COURSES}/${courseId}`);
    // }

    const navigateToCourses = () =>{
        history.push(COURSES);
    }

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setError(false);
            setIsLoading(true);

            axios.get(COURSES_ENDPOINT)
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

    // if (error) {
    //     return <Alert severity="warning">{error.message}</Alert>;
    // }

    // if (isLoading) {
    //     return <div>loading</div>
    //   }

    return (
        <>
            <TableContainer component={Paper} className={classes.block}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Bookable</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Dates</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.slice(-4)
                            .map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell component="th" scope="row">
                                        {course.title}
                                    </TableCell>
                                    <TableCell> {course.open && <CheckIcon style={{ color: "#4caf50" }} />}</TableCell>
                                    <TableCell>{course.price.normal} &euro;</TableCell>
                                    <TableCell>{course.dates.start_date} - {course.dates.end_date}</TableCell>
                                    {/* <TableCell><Button variant="contained" color="primary" onClick={navigateToCourseDetails(couse.id)}>View</Button></TableCell> */}
                                    <TableCell><Button variant="contained" color="primary" href={COURSES + "/" + course.id}>View</Button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={navigateToCourses} variant="contained" color="primary" className={classes.btn}>View All</Button>
        </>
    );
}

