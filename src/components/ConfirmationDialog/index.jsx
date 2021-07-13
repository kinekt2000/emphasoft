import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close"
import React from 'react';
import AdaptiveDialog from '../AdaptiveDialog';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}))

function ConfiramtionDialog({open, onOk, onCancel, header, ok="ok", cancel="cancel", loading=false, children}) {
    const classes = useStyles()

    return (
        <AdaptiveDialog open={open} onClose={() => {onCancel()}}>
            <DialogTitle id="form-dialog-title" disableTypography>
                <Typography align="left" variant="h4" display="block">
                    {header}
                </Typography>
                {onCancel ? 
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => {onCancel()}}>
                        <CloseIcon />
                    </IconButton>
                : null }
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => onCancel()} disabled={loading}>
                    {loading && <CircularProgress size={20} style={{marginRight: "10px"}}/>}
                    <Typography variant="h6">
                        {cancel}
                    </Typography>
                </Button>
                <Button variant="outlined" onClick={() => onOk()} disabled={loading} >
                    {loading && <CircularProgress size={20} style={{marginRight: "10px"}}/>}
                    <Typography variant="h6">
                        {ok}
                    </Typography>
                </Button>
            </DialogActions>
        </AdaptiveDialog>
    );
}

export default ConfiramtionDialog;