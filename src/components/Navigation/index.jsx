import React from 'react';
import { AppBar, Box, CircularProgress, CssBaseline, Divider, Drawer, Hidden, IconButton, makeStyles, Paper, Toolbar, useTheme } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

const drawerWidth = 320;
const breakpoint = "md"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up(breakpoint)]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(breakpoint)]: {
            display: 'none',
        },
    },
    drawerTop: {
        position: "sticky",
        left: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        zIndex: theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.paper
    },
    drawerTitle: {
        padding: theme.spacing(1.5)
    },
    drawerLoading: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        position: "relative"
    }
}));

function Navigation({loading=false, header=null, top=null, ...props}) {
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleDrawerClose = (event) => {
        event.stopPropagation()
        setMobileOpen(false)
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    { top }
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        <Paper className={classes.drawerTop} square>
                            <Box>
                                {header}
                            </Box>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </Paper>
                        <Divider/>
                        { loading || !props.children ? (
                            <Box className={classes.drawerLoading}>
                                <CircularProgress size={100} />
                            </Box>
                        ) : (
                            <div>
                                {props.children}
                            </div>
                        )}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} open>
                        <Toolbar className={classes.toolbar} />
                        { loading || !props.children ? (
                            <Box className={classes.drawerLoading}>
                                <CircularProgress size={100} />
                            </Box>
                        ) : (
                            <div className={classes.content}>
                                {props.children}
                            </div>
                        )}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    );
}

export default Navigation;