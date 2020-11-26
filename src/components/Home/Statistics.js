import { Typography, Grid, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    // root: {
    //     direction: "row",
    //     justify: "space-evenly",
    //     alignItems: "flex-start"
    // },
    paper: {
        padding: 10
    }
}));

export default function Statistics() {

    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start">
            <Grid item>
                <Paper className={classes.paper}>
                    <Typography>STUDENTS:</Typography>
                    <Typography>2245</Typography>
                </Paper>

            </Grid>
            <Grid item>
                <Paper className={classes.paper}>
                    <Typography>COURCES:</Typography>
                    <Typography>24</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.paper}>
                    <Typography>INSTRUCTORS:</Typography>
                    <Typography>2</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.paper}>
                    <Typography>EVENTS:</Typography>
                    <Typography>26</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}