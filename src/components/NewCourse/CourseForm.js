import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Divider, Button, Typography, FormGroup, Checkbox, makeStyles } from "@material-ui/core";
import { COURSES } from "../../constants/routes";
import { COURSES_ENDPOINT, INSTRUCTORS_ENDPOINT } from "../../api/endpoints";

const useStyles = makeStyles(() => ({
    form: {
        margin: 10
    },
    formGroup: {
        margin: 10
    },
    divider: {
        margin: 5
    },
}));


const CourseForm = () => {
    const classes = useStyles();
    const history = useHistory();

    // const [message, setMessage] = useState("");
    const [course, setCourse] = useState(
        {
            title: "",
            duration: "",
            imagePath: "",
            open: false,
            instructors: [],
            description: "",
            price: {
                early_bird: "",
                normal: ""
            },
            dates: {
                start_date: "",
                end_date: ""
            }
        });

    const [instructors, setInstructors] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(INSTRUCTORS_ENDPOINT);
                setInstructors(response.data);
            } catch {

            }
        };

        fetchData();
    }, []);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        if (name === "start_date" || name === "end_date") {
            const newDates = {
                ...course.dates,
                [name]: value
            }
            setCourse((course) => ({ ...course, dates: newDates }));
        }
        else if (name === "early_bird" || name === "normal") {
            const newPrice = {
                ...course.price,
                [name]: value
            }
            setCourse((course) => ({ ...course, price: newPrice }));
        }
        else if (name === "open") {
            setCourse((course) => ({ ...course, open: target.checked }));
        }
        else {
            setCourse((course) => ({ ...course, [name]: value }));
        }
    };

    const onInstructorChange = ({ target }) => {
        const index = course.instructors.indexOf(target.name);
        const newInstructorIds = course.instructors;
        if (target.checked) {
            index === -1  && newInstructorIds.push(target.name);
        } else {
            index !== -1  && newInstructorIds.splice(index, 1);
        }
        setCourse((course) =>({...course, instructors: newInstructorIds}));
    }

    const addCourse = async () => {
        try {
            const response = await axios.post(COURSES_ENDPOINT, course);
            alert("New course sucessfully added");
            // setMessage("New course sucessfully added");
        } catch (e) {
            alert(`Something went wrong ${e.setMessage}`);
            // setMessage(`Something went wrong ${e.setMessage}`);
        }
        // alert(message);
        history.push(COURSES);
    }

    return (

        <form className={classes.form}>
            <Typography variant="h4">Add Course</Typography>
            <FormGroup className={classes.formGroup}>
                <Typography>Title</Typography>
                <TextField
                    fullWidth size="small" id="title" variant="outlined" name="title"
                    value={course.title}
                    onChange={(event) => { onInputChange(event) }}
                />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
                <Typography>Duration</Typography>
                <TextField
                    fullWidth size="small" id="duration" variant="outlined" name="duration"
                    value={course.duration}
                    onChange={(event) => { onInputChange(event) }}
                />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
                <Typography>Image Path</Typography>
                <TextField
                    fullWidth size="small" id="imagePath" variant="outlined" name="imagePath"
                    value={course.imagePath}
                    onChange={(event) => { onInputChange(event) }}
                />
            </FormGroup>
            <FormGroup row className={classes.formGroup}>
                <Typography>Bookable</Typography>
                <Checkbox
                    color="primary"
                    name="open"
                    checked={course.open}
                    onChange={(event) => { onInputChange(event) }}
                />
            </FormGroup>
            <Divider className={classes.divider}/>
            <FormGroup row className={classes.formGroup}>
                <Typography variant="h5">Instructors</Typography>

                <>
                    <Typography>Dimitra Adam</Typography>
                    <Checkbox
                        color="primary"
                        name="01"
                        checked={course?.instructors?.indexOf("01") !== -1}
                        onChange={(event) => { onInstructorChange(event) }}
                    />
                </>
                <>
                    <Typography>John Doe</Typography>
                    <Checkbox
                        color="primary"
                        name="02"
                        checked={course?.instructors?.indexOf("02") !== -1}
                        onChange={(event) => { onInstructorChange(event) }}
                    />
                </>

                {/* {instructors.map((instructor) => {
                    <>
                        <Typography>{instructor?.name?.first} {instructor?.name?.last}</Typography>
                        <Checkbox
                            color="primary"
                            name={instructor?.id}
                            checked={course?.instructors?.indexOf(instructor?.id) !== -1}
                            onChange={(event) => { onInstructorChange(event) }}
                        />
                    </>
                }
                )} */}
            </FormGroup>
            <Divider className={classes.divider}/>
            <FormGroup className={classes.formGroup}>
                <Typography>Description</Typography>
                <TextField
                    fullWidth size="small" id="description" variant="outlined" name="description"
                    value={course.description}
                    onChange={(event) => { onInputChange(event) }}
                />
            </FormGroup>
            <Divider className={classes.divider}/>
            <Typography variant="h5">Dates</Typography>
            <FormGroup className={classes.formGroup}>
                <Typography>Start Date</Typography>
                <TextField
                    fullWidth size="small" id="start_date" variant="outlined" name="start_date"
                    value={course?.dates?.start_date}
                    type="date"
                    onChange={(event) => { onInputChange(event) }}
                />
                <Typography>End Date</Typography>
                <TextField
                    fullWidth size="small" id="end_date" variant="outlined" name="end_date"
                    value={course?.dates?.end_date}
                    type="date"
                    onChange={(event) => { onInputChange(event) }}
                />
            </FormGroup>
            <Divider className={classes.divider}/>
            <Typography variant="h5">Price</Typography>
            <FormGroup className={classes.formGroup}>
                <Typography>Normal</Typography>
                <TextField
                    fullWidth size="small" id="normal" variant="outlined" name="normal"
                    value={course?.price?.normal}
                    onChange={(event) => { onInputChange(event) }}
                />
                <Typography>Early bird</Typography>
                <TextField
                    fullWidth size="small" id="early_bird" variant="outlined" name="early_bird"
                    value={course?.price?.early_bird}
                    onChange={(event) => { onInputChange(event) }}
                />
            </FormGroup>
            <Button variant="contained" color="primary" onClick={addCourse}>Add Course</Button>
        </form >
    );
}



export default CourseForm;