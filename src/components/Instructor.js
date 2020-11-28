import React  from 'react';
import {  Typography  } from '@material-ui/core';

const Instructor = ({ instructor }) => {
    
    return (
        <>
            <Typography variant="h6">{instructor.name.first} {instructor.name.last} ({instructor.dob})</Typography>
             Email:<a href={instructor.email} target="_blank"> {instructor.email}</a> | <a href={instructor.linkedin} target="_blank">Linkedin</a>
            <Typography variant="body1">{instructor.bio}</Typography>
        </>
    );

}



export default Instructor;