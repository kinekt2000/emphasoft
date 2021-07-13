import React from 'react';
import { CssBaseline, makeStyles, Toolbar} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
}))

function Body({...props}) {
    const classes = useStyles();
    // const theme = useTheme();

    return (
        <>
            <CssBaseline />
            <main className={classes.content}>
                <Toolbar />
                { props.children }
            </main>
        </>
    );
}

export default Body;

