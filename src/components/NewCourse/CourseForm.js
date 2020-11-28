import React, { useState } from "react";
import { TextField, Divider, Button, Typography, FormGroup, Checkbox, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 10
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const API_BASE_URL = "http://localhost:3001";
const enpointPrefix = `${API_BASE_URL}/courses`;

const CourseForm = () => {
    const classes = useStyles();


    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [open, setOpen] = useState(false);
    const [instructors, setInstructors] = useState([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState({
        early_bird: "",
        normal: ""
    });
    const [dates, setDates] = useState({
        start_date: "",
        end_date: ""
    });

    const [message, setMessage] = useState("");

    const [course, setCourse] = useState(
        {
            title: title, duration: duration, imagePath: imagePath, open: open, instructors: instructors, description: description,
            price: price, dates: dates
        });


    const onInputChange = ({ target }, setState) => {
        const { name, value } = target;
        if (name === "start_date" || name === "end_date") {
            setState((dates) => ({
                ...dates,
                [name]: value
            }));
            setCourse((course) => ({ ...course, dates: dates }));
        }
        else if (name === "early_bird" || name === "normal") {
            setState((price) => ({
                ...price,
                [name]: value
            }));
            setCourse((course) => ({ ...course, price: price }));
        }
        else if (name === "open") {
            setState(target.checked);
            setCourse((course) => ({ ...course, open: target.checked }));
        }
        else {
            setState(value);
            setCourse((course) => ({ ...course, [name]: value }));
        }
    };

    const { start_date, end_date } = dates;
    const { early_bird, normal } = price;

    const onSubmit = () => {
        axios.post(enpointPrefix, course)
            .then(setMessage("New course sucessfully added"))
            .catch(error => setMessage(`Something went wrong ${error.setMessage}`))
    }


    return (

        <form className={classes.form} noValidate autoComplete="off">
            <Typography variant="h4">Add Course</Typography>
            <FormGroup row>
                <Typography>Title</Typography>
                <TextField
                    fullWidth size="small" id="title" variant="outlined" name="title"
                    value={title}
                    onChange={(event) => { onInputChange(event, setTitle) }}
                />
            </FormGroup>
            <FormGroup row>
                <Typography>Duration</Typography>
                <TextField
                    fullWidth size="small" id="duration" variant="outlined" name="duration"
                    value={duration}
                    onChange={(event) => { onInputChange(event, setDuration) }}
                />
            </FormGroup>
            <FormGroup row>
                <Typography>Image Path</Typography>
                <TextField
                    fullWidth size="small" id="imagePath" variant="outlined" name="imagePath"
                    value={imagePath}
                    onChange={(event) => { onInputChange(event, setImagePath) }}
                />
            </FormGroup>
            <FormGroup row>
                <Typography>Bookable</Typography>
                <Checkbox
                    color="primary"
                    name="open"
                    checked={open}
                    onChange={(event) => { onInputChange(event, setOpen) }}
                />
            </FormGroup>
            <Divider />
            <FormGroup row>
                <Typography variant="h5">Instructors</Typography>
                {/* map instructors
                <Checkbox
                    color="primary"
                    name={instructors.id}
                    checked="true"
                    onChange={(event) => { onInputChange(event, setInstructors) }}
                /> */}
            </FormGroup>
            <Divider />
            <FormGroup row>
                <Typography>Description</Typography>
                <TextField
                    fullWidth size="small" id="description" variant="outlined" name="description"
                    value={description}
                    onChange={(event) => { onInputChange(event, setDescription) }}
                />
            </FormGroup>
            <Divider />

            <FormGroup row>
                <Typography variant="h5">Dates</Typography>
                <Typography>Start Date</Typography>
                <TextField
                    fullWidth size="small" id="start_date" variant="outlined" name="start_date"
                    value={start_date}
                    type="date"
                    onChange={(event) => { onInputChange(event, setDates) }}
                />
                <Typography>End Date</Typography>
                <TextField
                    fullWidth size="small" id="end_date" variant="outlined" name="end_date"
                    value={end_date}
                    type="date"
                    onChange={(event) => { onInputChange(event, setDates) }}
                />
            </FormGroup>
            <Divider />
            <FormGroup row>
                <Typography variant="h5">Price</Typography>
                <Typography>Normal</Typography>
                <TextField
                    fullWidth size="small" id="normal" variant="outlined" name="normal"
                    value={normal}
                    onChange={(event) => { onInputChange(event, setPrice) }}
                />
                <Typography>Early bird</Typography>
                <TextField
                    fullWidth size="small" id="early_bird" variant="outlined" name="early_bird"
                    value={early_bird}
                    onChange={(event) => { onInputChange(event, setPrice) }}
                />
            </FormGroup>
            <Divider />


            <Button variant="contained" color="primary" onClick={onSubmit}>Add Course</Button>

            <Typography>{message}</Typography>
        </form >
    );
}



export default CourseForm;