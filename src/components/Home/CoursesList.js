import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, makeStyles, TableContainer, Typography, Table, TableHead, TableRow, TableBody, TableCell, Paper, CircularProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { COURSES } from "../../constants/routes";
import { COURSES_ENDPOINT } from "../../api/endpoints";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} style={{ margin: 20 }} />;
}

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
    },
    tableTitle: {
        margin: 20
    }
});

const CoursesList = () => {
    const classes = useStyles();
    const history = useHistory();

    const navigateToCourseDetails = (courseId) => {
        history.push(`${COURSES}/${courseId}`);
    }

    const navigateToCourses = () => {
        history.push(COURSES);
    }

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
        return <CircularProgress color="primary" />
    }

    return (
        <>
            <Typography variant="h6" className={classes.tableTitle}>Last 4 Courses</Typography>
            <TableContainer component={Paper} className={classes.block}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Bookable</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                            <TableCell><b>Dates</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
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
                                    <TableCell><Button variant="contained" color="primary" onClick={() => navigateToCourseDetails(course.id)}>View</Button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={navigateToCourses} variant="contained" color="primary" className={classes.btn}>View All</Button>
        </>
    );
}

export default CoursesList; 