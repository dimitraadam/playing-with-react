import { Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        padding: 30,
        margin:30,
        borderRadius: 3,
        background: "whitesmoke",
    }
}));

export default function Jumbotron() {

    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <Typography variant="h4">
                Welcome to Legendary.Academy Dashboard
            </Typography>
            <Typography variant="h6">
                Learn everything and have fun!
            </Typography>
        </Grid>
    );
};