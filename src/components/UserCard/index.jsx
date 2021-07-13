import { Box, Button, IconButton, InputAdornment, makeStyles, Paper, Slide, TextField, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useFetch from '@root/hooks/useFetch';
import { USERS_PARTIAL_UPDATE } from '@root/modules/api/endpoints';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useEffect } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 1, 2),
        maxWidth: theme.breakpoints.width("sm")
    },
    paper: {
        position: "relative",
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    header: {
        position: "absolute",
        margin: 0,
        left: 0,
        top: 0,
        padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
        transform: `translate(${theme.spacing(3)}px, -50%)`
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

function UserCard({user, onUpdate=null}) {
    const classes = useStyles()

    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)

    const [username, setUsername] = React.useState(user.username)
    const [password, setPassword] = React.useState("")
    const [first_name, setFirstname] = React.useState(user.username)
    const [last_name, setLastname] = React.useState(user.username)

    const { enqueueSnackbar } = useSnackbar();
    const { response: patchResponse, performFetch: performPatchFetch, clearFetch: clearPatchFetch } = useFetch(USERS_PARTIAL_UPDATE);

    useEffect(() => {
        setUsername(user.username)
        setPassword("")
        setFirstname(user.first_name)
        setLastname(user.last_name)
    }, [user])

    useEffect(() => {
        const {data, error} = patchResponse

        if (error) {
            if (error.password) {
                enqueueSnackbar(error.password, createSnackbar({variant: "error"}))
            }

            if (error.username) {
                enqueueSnackbar(error.username, createSnackbar({variant: "error"}))
            }

            if (error.detail) {
                enqueueSnackbar("Request parse error. My fault :(", createSnackbar({variant: "error"}))
            }
            clearPatchFetch()
        }

        if (data) {
            if (data.is_active !== user.is_active) {
                enqueueSnackbar("Removed user successfully", createSnackbar({variant: "success"}))
            } else {
                enqueueSnackbar("Changed user successfully", createSnackbar({variant: "success"}))
            }
            clearPatchFetch()
            if (onUpdate) {
                onUpdate(data)
            }
        }

    }, [patchResponse, enqueueSnackbar, user, clearPatchFetch, onUpdate])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleChangeButton = () => {
        const patchData = {}

        if (username !== user.username) {
            if(!username) {
                enqueueSnackbar("Username can't be empty", createSnackbar({variant: "error"}))
                return
            }
            if (!/^[\w.@+-]+$/.test(username)) {
                enqueueSnackbar("Username invalid. Letters, digits and @/./+/-/_ only", createSnackbar({variant: "error"}))
                return
            }
            patchData.username = username
        }

        if (password !== "") {
            if (/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
                enqueueSnackbar("Password should be 8+ characters and at least 1 capital, 1 numeric", createSnackbar({variant: "error"}))
                return
            }
            patchData.password = password
        }

        if (first_name !== user.first_name) {
            patchData.first_name = first_name
        }

        if (last_name !== user.last_name) {
            patchData.last_name = last_name
        }

        if (Object.keys(patchData).length === 0) {
            enqueueSnackbar("There are no changes", createSnackbar({variant: "default"}))
            return
        }

        performPatchFetch(patchData, {id: user.id})
    }

    const handleRemove = () => {
        performPatchFetch({is_active: false}, {id: user.id})
    }

    return (
        <>
            <ConfirmationDialog
                open={showConfirmDialog}
                header="Remove user"
                onOk={handleRemove}
                onCancel={() => {setShowConfirmDialog(false)}}
                loading={patchResponse.loading}
            >
                <Typography variant="body1">
                    Are you sure you want to remove user?
                </Typography>
            </ConfirmationDialog>

            <Paper className={classes.root}>
                <Paper className={classes.paper} variant="outlined">
                    <Paper className={classes.header} variant="outlined">
                        <Typography variant="subtitle2">
                            Authentication data
                        </Typography>
                    </Paper>

                    <TextField
                        autoFocus
                        margin="normal"
                        id="username"
                        label="Username"
                        variant="filled"
                        type="text"
                        inputProps={{ maxLength: 150 }}
                        value={username}
                        helperText={username !== user.username ? "modified" : null}
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                    />

                    <TextField
                        margin="normal"
                        id="password"
                        label="Password"
                        variant="filled"
                        type={showPassword ? "text" : "password"}
                        inputProps={{ maxLength: 128 }}
                        value={password}
                        helperText={password !== "" ? "modified" : null}
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                        fullWidth
                    />
                </Paper>

                <Paper className={classes.paper} variant="outlined">
                    <Paper className={classes.header} variant="outlined">
                        <Typography variant="subtitle2">
                            Personal data
                        </Typography>
                    </Paper>

                    <TextField
                        margin="normal"
                        id="firstname"
                        label="First name"
                        variant="filled"
                        type="text"
                        inputProps={{ maxLength: 30 }}
                        value={first_name}
                        helperText={first_name !== user.first_name ? "modified" : null}
                        onChange={(event) => setFirstname(event.target.value)}
                        fullWidth
                    />

                    <TextField
                        margin="normal"
                        id="lastname"
                        label="Last name"
                        variant="filled"
                        type="text"
                        inputProps={{ maxLength: 150 }}
                        value={last_name}
                        helperText={last_name !== user.last_name ? "modified" : null}
                        onChange={(event) => setLastname(event.target.value)}
                        fullWidth
                    />
                </Paper>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" color="secondary" onClick={() => setShowConfirmDialog(true)}>Remove</Button>
                    <Button variant="contained" onClick={handleChangeButton}>Change</Button>
                </Box>
            </Paper>
        </>
    );
}

export default UserCard;