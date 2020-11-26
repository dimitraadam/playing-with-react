import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const CourseCard = ({ course }) => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h4">{course.title}</Typography>
            <img src={course.imagePath} />
            <Typography variant="h6">Price: {course.price.normal}</Typography>
            <Typography variant="h6">Bookable: 
            {/* {{course.open}? () :() } */}
                        {course.open}</Typography>

            <Typography variant="h6">Early bird: {course.price.early_bird}</Typography>
            <Typography variant="h6">Duration: {course.duration}</Typography>
            <Typography variant="h6">Dates: {course.dates.start_date} - {course.dates.end_date}</Typography>
        </CardContent>
        <CardActions>
            <Button variant="contained" size="small" color="primary" href={"/courses/"+ course.id}>View</Button>
        </CardActions>
    </Card>
);

export default CourseCard;