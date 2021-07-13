import { Box, Button, CircularProgress, DialogActions, DialogContent, DialogTitle, makeStyles, Slide, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SignIn from '@components/SignIn';
import useFetch from '@hooks/useFetch';
import { TOKEN_AUTH_CREATE } from '@root/modules/api/endpoints';
import { useDispatch } from 'react-redux';
import { storageActions } from '@root/modules/storage/actions';
import api from '@root/modules/api/api';
import AdaptiveDialog from '../AdaptiveDialog';
import { useCallback } from 'react';


const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "none"
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

function AuthDialog(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { enqueueSnackbar } = useSnackbar();
    
    const [signIn, setSignIn] = React.useState(false)
    const { response: authResponse, performFetch: performAuthFetch, clearFetch: clearAuthFetch } = useFetch(TOKEN_AUTH_CREATE);
    
    const defaultState = { username: "", password: ""}
    const [userData, setUserData] = React.useState(defaultState)

    const handleChange = useCallback((userData) => {
        setUserData(userData)
    }, [setUserData])

    const handleSignIn = useCallback(() => {
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

        setSignIn(true)
    }, [enqueueSnackbar, userData])

    useEffect(() => {
        if (signIn) {
            performAuthFetch(userData)
        }
    }, [signIn, userData, performAuthFetch])

    useEffect(() => {
        const submitOnEnter = (event) => {
            if (event.key === "Enter") {
                handleSignIn()
            }
        }

        window.addEventListener("keypress", submitOnEnter)

        return () => {
            window.removeEventListener("keypress", submitOnEnter)
        }
    }, [handleSignIn])

    useEffect(() => {
        const {data, loading, error} = authResponse

        if (error) {
            if (error.non_field_errors) {
                error.non_field_errors.forEach(el => {
                    enqueueSnackbar(el, createSnackbar({variant: "error"}))
                })
            }

            if (error.password) {
                enqueueSnackbar(error.password.replace("This", "Password"), createSnackbar({variant: "error"}))
            }

            if (error.username) {
                enqueueSnackbar(error.username.replace("This", "Username"), createSnackbar({variant: "error"}))
            }

            if (error.detail) {
                enqueueSnackbar("Request parse error. My fault :(", createSnackbar({variant: "error"}))
            }
        }

        if (data) {
            api.common.headers.Authorization = `Token ${data.token}`
            dispatch(storageActions.setMe(userData.username))
            clearAuthFetch()
            enqueueSnackbar("Successfully logged in", createSnackbar({variant: "success"}))
        }

        if (!loading) {
            setSignIn(false)
        }
    }, [authResponse, enqueueSnackbar, dispatch, userData.username, clearAuthFetch])

    return (
        <>
            <AdaptiveDialog open>
                <DialogTitle id="form-dialog-title" disableTypography>
                    <Typography align="center" variant="h4" display="block">
                        SIGN IN
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" height="100%">
                        <SignIn onChange={handleChange} value={userData}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        onClick={handleSignIn}
                        disabled={authResponse.loading}
                    >
                        {authResponse.loading && <CircularProgress size={20} style={{marginRight: "10px"}}/>}
                        <Typography variant="h6">
                            Sign In
                        </Typography>
                    </Button>
                </DialogActions>
            </AdaptiveDialog>
        </>
    );
}

export default AuthDialog;