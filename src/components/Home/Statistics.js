import React, { useState, useEffect } from "react";
import { Avatar, Chip, Typography, Grid, makeStyles, Paper } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(() => ({
    paper: {
        padding: 10
    },
    label: {
        textTransform: 'uppercase',
      },
}));

const API_BASE_URL = "http://localhost:3001";
const enpointPrefix = `${API_BASE_URL}/stats`;

export default function Statistics() {

    const classes = useStyles();

    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setError(false);
            setIsLoading(true);

            axios.get(enpointPrefix)
                .then(response => {
                    setStats(response.data);
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
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start">
            {stats.map((stat) =>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography >{stat.title}</Typography>
                        <Chip color="primary" label={stat.amount} />
                    </Paper>
                </Grid>)}            
        </Grid>
    );
}
