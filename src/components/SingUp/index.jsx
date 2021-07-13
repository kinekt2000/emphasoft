import { IconButton, InputAdornment, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "relative",
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
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

function SignUp({onChange, value=null}) {
    const classes = useStyles()

    const [showPassword, setShowPassword] = React.useState(false)

    const usernameRef = React.createRef()
    const passwordRef = React.createRef()
    const firstnameRef = React.createRef()
    const lastnameRef = React.createRef()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleChange = () => {
        onChange({
            username:  usernameRef.current.value,
            password:  passwordRef.current.value,
            first_name: firstnameRef.current.value,
            last_name:  lastnameRef.current.value
        })
    }

    return (
        <>
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
                    inputRef={usernameRef}
                    value={value?.username}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    margin="normal"
                    id="password"
                    label="Password"
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    inputProps={{ maxLength: 128 }}
                    inputRef={passwordRef}
                    value={value?.password}
                    onChange={handleChange}
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
                    inputRef={firstnameRef}
                    value={value?.firstname}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    margin="normal"
                    id="lastname"
                    label="Last name"
                    variant="filled"
                    type="text"
                    inputProps={{ maxLength: 150 }}
                    inputRef={lastnameRef}
                    value={value?.lastname}
                    onChange={handleChange}
                    fullWidth
                />
            </Paper>
        </>
    );
}

export default SignUp;