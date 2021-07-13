import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Hidden, IconButton, List, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import UpdateIcon from "@material-ui/icons/Update"
import ExitIcon from "@material-ui/icons/ExitToApp"

import { USERS_LIST } from "@modules/api/endpoints";
import useFetch from "@hooks/useFetch";

import Navigation from "@components/Navigation";
import Body from '@components/Body';
import AuthDialog from '@components/AuthDialog';
import UserListItem from "@components/UserListItem";
import CreateUserDialog from "./components/CreateUserDialog";
import UserCard from "./components/UserCard";
import api from "./modules/api/api";
import { storageActions } from "./modules/storage/actions";


const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    filter: {
        position: "sticky",
        top: theme.spacing(8),
        [theme.breakpoints.down("xs")] : {
            top: theme.spacing(7)
        },

        display: "flex",

        padding: theme.spacing(2, 1),
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper
    },
    topButton: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
    meButton: {
        textTransform: "none",
        textDecoration: "underline !important"
    }
}))
 

// const apiSelector = state => state.api;
const storageSelector = state => state.storage;

function App() {
    const classes = useStyle()
    const storageState = useSelector(storageSelector)
    const dispatch = useDispatch()

    const [usernameFilter, setUsernameFilter] = React.useState("")
    const [openRegister, setOpenRegister] = React.useState(false)
    const [selectedUser, setSelectedUser] = React.useState(null)

    const { response: usersResponse, performFetch: performUsersFetch, clearFetch: clearUsersFetch } = useFetch(USERS_LIST);

    useEffect(() => {
        if (storageState.me) {
            performUsersFetch()
        }
    }, [storageState.me, performUsersFetch])

    const handleFilterChange = (event) => {
        setUsernameFilter(event.target.value)
    }

    const selectMe = () => {
        if (usersResponse.data) {
            for(const user of usersResponse.data) {
                if (user.is_active && (user.username === storageState.me?.username)) {
                    setSelectedUser(user.id)
                }
            }
        }
    }

    const handleLogOut = () => {
        delete api.common.headers.Authorization
        dispatch(storageActions.unsetMe())
        clearUsersFetch()
    }

    console.log(storageState.me?.username);

    const handleItemClick = (id) => {
        if (id !== selectedUser) {
            setSelectedUser(id)
        } else {
            setSelectedUser(null)
        }
    }

    const handleUserCard = (user) => {

        if (user.username === storageState.me.username && user.is_active === false) {
            delete api.common.headers.Authorization
            dispatch(storageActions.unsetMe())
        }
        setSelectedUser(null)

        handleUpdate()
    }

    const handleUpdate = () => {
        performUsersFetch()
    }

    return (
        <div className={classes.root}>
            <Navigation
                loading={usersResponse.loading}
                top={
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" noWrap>
                            Emphasoft
                        </Typography>
                        <Hidden smDown>
                            <Button className={classes.topButton} variant="outlined" color="inherit" onClick={() => setOpenRegister(true)}>Register User</Button>
                        </Hidden>
                        {storageState.me ? (
                            <Box display="flex">
                                <Button color="inherit" className={classes.meButton} onClick={selectMe}>
                                    <Typography variant="h6" noWrap>
                                        {storageState.me.username}
                                    </Typography>
                                </Button>
                                <IconButton color="inherit" onClick={handleLogOut}>
                                    <ExitIcon fontSize="large"/>
                                </IconButton>
                            </Box>
                        ) : null}
                    </Box>
                }
                header={
                    <Button variant="outlined" color="inherit" onClick={() => setOpenRegister(true)}>Register User</Button>
                }
            >
                <Paper className={classes.filter} square>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Find username"
                        placeholder="Enter username..."
                        onChange={handleFilterChange}
                        value={usernameFilter}
                    />
                    <IconButton aria-label="update" onClick={handleUpdate}>
                        <UpdateIcon fontSize="large" />
                    </IconButton>
                </Paper>
                <List>
                    { (usersResponse.data || [])
                        .sort((a, b) => a.id - b.id || 0)
                        .filter(user => user.username.match(new RegExp(usernameFilter, "i")))
                        .filter(user => user.is_active)
                        .map(user => (
                            <UserListItem
                                key={user.id}
                                id={user.id}
                                username={user.username}
                                selected={user.id === selectedUser}
                                onClick={handleItemClick}
                            />
                        )
                    )}
                </List>
            </Navigation>
            <Body>
                { selectedUser ? (
                    <UserCard user={usersResponse.data.find(user => user.id === selectedUser)} onUpdate={handleUserCard} />
                ) : null}

                { ! storageState.me ? <AuthDialog/> : null }

                <CreateUserDialog open={openRegister} onClose={() => setOpenRegister(false)} onCreatedUser={handleUpdate} />
            </Body>
        </div>
    );
}

export default App;
