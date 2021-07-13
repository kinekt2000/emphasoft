import React from "react";
import { Box, Button, CircularProgress, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Slide, Typography} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import AdaptiveDialog from '@components/AdaptiveDialog';
import SignUp from '@components/SingUp';
import { useSnackbar } from "notistack";
import useFetch from "@root/hooks/useFetch";
import { USERS_CREATE } from "@root/modules/api/endpoints";
import { useEffect } from "react";


const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "none"
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}))


const createSnackbar = (args) => {
    return {
        anchorOrigin: {
            horizontal: "center",
            vertical: "top"
        },
        transitionDuration: {
            appear: 200,
            enter: 200,
            exit: 400
        },
        autoHideDuration: 3000,
        TransitionComponent: (props) => <Slide {...props} direction="down"/>,
        ...args
    }
}


function CreateUserDialog({open, onClose=null, onCreatedUser=null}) {
    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar();

    const defaultState = {username: "", password: "", first_name: "", last_name: ""} 
    const [userData, setUserData] = React.useState(defaultState)

    const [create, setCreate] = React.useState(false)
    const { response: regResponse, performFetch: performRegFetch, clearFetch: clearRegFetch } = useFetch(USERS_CREATE);

    useEffect(() => {
        if (create) {
            performRegFetch({...userData, is_active: true})
        }
    }, [create, userData, performRegFetch])

    useEffect(() => {
        const {data, loading, error} = regResponse

        if (error) {
            const {username, password, detail, ...rest} = error

            if (password) {
                enqueueSnackbar(error.password, createSnackbar({variant: "error"}))
            }

            if (username) {
                enqueueSnackbar(error.username, createSnackbar({variant: "error"}))
            }

            if (detail) {
                enqueueSnackbar(error.detail, createSnackbar({variant: "error"}))
            }

            for(const [key, value] of Object.entries(rest)) {
                const string = value.join("; ")
                enqueueSnackbar(`${key}: ${string}`, createSnackbar({variant: "error"}))
            }
        }

        if (data) {
            enqueueSnackbar("Сreated user successfully", createSnackbar({variant: "success"}))
            if (onCreatedUser) {
                onCreatedUser(data)
                clearRegFetch()
            }
            onClose()
        }

        if (!loading) {
            setCreate(false)
        }
    }, [regResponse, enqueueSnackbar, onClose, onCreatedUser, clearRegFetch])

    const handleRegister = () => {
        const {username, password} = userData
        if (!username && !password) {
            enqueueSnackbar("Username and Password required", createSnackbar({variant: "error"}))
            return
        }

        if (!username) {
            enqueueSnackbar("Username required", createSnackbar({variant: "error"}))
            return
        }

        if (!password) {
            enqueueSnackbar("Password required", createSnackbar({variant: "error"}))
            return
        }

        if (!/^[\w.@+-]+$/.test(username)) {
            enqueueSnackbar("Username invalid. Letters, digits and @/./+/-/_ only", createSnackbar({variant: "error"}))
            return
        }

        if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            enqueueSnackbar("Password should be 8+ characters and at least 1 capital, 1 numeric", createSnackbar({variant: "error"}))
            return
        }

        setCreate(true)
    }

    const handleChange = (userData) => {
        setUserData(userData)
    }

    return (
        <AdaptiveDialog open={open} onClose={() => {onClose()}}>
            <DialogTitle id="form-dialog-title" disableTypography>
                <Typography align="center" variant="h4" display="block">
                    REGISTER NEW USER
                </Typography>
                {onClose ? 
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => {onClose()}}>
                        <CloseIcon />
                    </IconButton>
                : null }
            </DialogTitle>
            <DialogContent dividers>
                <Box display="flex" flexDirection="column" height="100%">
                    <SignUp onChange={handleChange} value={userData}/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={handleRegister}
                    disabled={regResponse.loading}
                >
                    {regResponse.loading && <CircularProgress size={20} style={{marginRight: "10px"}}/>}
                    <Typography variant="h6">
                        Register
                    </Typography>
                </Button>
            </DialogActions>
        </AdaptiveDialog>
    );
}

export default CreateUserDialog;