import React, {useState, useEffect} from 'react';
import { Button, Grid, makeStyles, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';

const useStyles = makeStyles({  
    table: {
        minWidth: 650
    },
});

const API_BASE_URL = "http://localhost:3001";
const enpointPrefix = `${API_BASE_URL}/courses`;

export default function CoursesList() {
    const classes = useStyles();

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

    // if (error) {
    //     return <Alert severity="warning">{error.message}</Alert>;
    // }

    // if (isLoading) {
    //     return <div>loading</div>
    //   }

    return (
        <Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Bookable</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell component="th" scope="row">
                                    {course.title}
                                </TableCell>                                
                                <TableCell> {course.open} <CheckIcon style={{ color: "#4caf50"}}/></TableCell>
                                
                                <TableCell>{course.price.normal}</TableCell>
                                <TableCell>{course.dates.start_date} - {course.dates.end_date}</TableCell>
                                <TableCell><Button variant="contained" color="primary" href={"/courses/" + course.id}>View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button href="/courses" variant="contained" color="inherit">View All</Button>
        </Grid>
    );
}

