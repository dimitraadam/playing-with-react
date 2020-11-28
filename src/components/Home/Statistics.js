import React, { useState, useEffect } from "react";
import { Chip, Typography, Grid, makeStyles, Paper } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import { STATS_ENDPOINT } from "../../api/endpoints";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(() => ({
    paper: {
        padding: 10,
        display: 'flex'        
    },
    label: {
        padding: 5,
        textTransform: 'uppercase',
      },
}));

const Statistics = () => {

    const classes = useStyles();

    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const response = await axios.get(STATS_ENDPOINT);
                setStats(response.data);
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
        return <Typography variant="body1">Loading...</Typography>
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start">
            {stats.map((stat) =>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography className={classes.label}>{stat.title}</Typography>
                        <Chip color="primary" label={stat.amount} />
                    </Paper>
                </Grid>)}            
        </Grid>
    );
}

export default Statistics;