import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';

function SignIn({onChange, value = null}) {
    const [showPassword, setShowPassword] = React.useState(false)

    const usernameRef = React.createRef()
    const passwordRef = React.createRef()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleChange = () => {
        onChange({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })
    }

    return (
        <>
            <TextField
                autoFocus
                margin="normal"
                id="username"
                label="Username"
                variant="filled"
                type="text"
                inputProps={{ maxLength: 150 }}
                inputRef={usernameRef}
                onChange={handleChange}
                value={value?.username}
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
                onChange={handleChange}
                value={value?.password}
                fullWidth
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
            />
        </>
    );
}

export default SignIn;