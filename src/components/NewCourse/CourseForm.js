import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Divider, Button, Typography, FormGroup, Checkbox, makeStyles } from "@material-ui/core";
import { COURSES } from "../../constants/routes";
import { COURSES_ENDPOINT, INSTRUCTORS_ENDPOINT } from "../../api/endpoints";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 10
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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

    const onSimpleInputChange = ({ target }) => {
        const { name, value } = target;
        setCourse((course) => ({ ...course, [name]: value }));
    };

    const onNestedInputChange = ({ target }) => {
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
    };

    const onBookableCheckboxChange = ({target}) => {
        setCourse((course) => ({ ...course, open: target.checked }));
    }
    
    const onSubmit = async () => {
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

        <form className={classes.form} noValidate autoComplete="off">
            <Typography variant="h4">Add Course</Typography>
            <FormGroup row>
                <Typography>Title</Typography>
                <TextField
                    fullWidth size="small" id="title" variant="outlined" name="title"
                    value={course.title}
                    onChange={(event) => { onSimpleInputChange(event) }}
                />
            </FormGroup>
            <FormGroup row>
                <Typography>Duration</Typography>
                <TextField
                    fullWidth size="small" id="duration" variant="outlined" name="duration"
                    value={course.duration}
                    onChange={(event) => { onSimpleInputChange(event) }}
                />
            </FormGroup>
            <FormGroup row>
                <Typography>Image Path</Typography>
                <TextField
                    fullWidth size="small" id="imagePath" variant="outlined" name="imagePath"
                    value={course.imagePath}
                    onChange={(event) => { onSimpleInputChange(event) }}
                />
            </FormGroup>
            <FormGroup row>
                <Typography>Bookable</Typography>
                <Checkbox
                    color="primary"
                    name="open"
                    checked={course.open}
                    onChange={(event) => { onBookableCheckboxChange(event) }}
                />
            </FormGroup>
            <Divider />
            <FormGroup>
                <Typography variant="h5">Instructors</Typography>
                {instructors.map((instructor) => {
                    <>
                        <Typography>{instructor.id}</Typography>
                        {/* <Checkbox
                    color="primary"
                    name={instructor?.id}
                    checked="true"
                    onChange={(event) => { onInputChange(event, setInstructorIds) }}
                    /> */}
                    </>
                }
                )}
            </FormGroup>
            <Divider />
            <FormGroup row>
                <Typography>Description</Typography>
                <TextField
                    fullWidth size="small" id="description" variant="outlined" name="description"
                    value={course.description}
                    onChange={(event) => { onSimpleInputChange(event) }}
                />
            </FormGroup>
            <Divider />
            <Typography variant="h5">Dates</Typography>
            <FormGroup row>
                <Typography>Start Date</Typography>
                <TextField
                    fullWidth size="small" id="start_date" variant="outlined" name="start_date"
                    value={course?.dates?.start_date}
                    type="date"
                    onChange={(event) => { onNestedInputChange(event) }}
                />
                <Typography>End Date</Typography>
                <TextField
                    fullWidth size="small" id="end_date" variant="outlined" name="end_date"
                    value={course?.dates?.end_date}
                    type="date"
                    onChange={(event) => { onNestedInputChange(event) }}
                />
            </FormGroup>
            <Divider />
            <Typography variant="h5">Price</Typography>
            <FormGroup row>
                <Typography>Normal</Typography>
                <TextField
                    fullWidth size="small" id="normal" variant="outlined" name="normal"
                    value={course?.price?.normal}
                    onChange={(event) => { onNestedInputChange(event) }}
                />
                <Typography>Early bird</Typography>
                <TextField
                    fullWidth size="small" id="early_bird" variant="outlined" name="early_bird"
                    value={course?.price?.early_bird}
                    onChange={(event) => { onNestedInputChange(event) }}
                />
            </FormGroup>
            <Divider />


            <Button variant="contained" color="primary" onClick={onSubmit}>Add Course</Button>
        </form >
    );
}



export default CourseForm;