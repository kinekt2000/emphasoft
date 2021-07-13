import { Dialog, Hidden } from '@material-ui/core';

function AdaptiveDialog({open=true, onClose=null, children}) {
    return (
        <>
            <Hidden smUp>
                <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullScreen>
                    {children}
                </Dialog>
            </Hidden>
            <Hidden xsDown>
                <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                    {children}
                </Dialog>
            </Hidden>
        </>
    );
}

export default AdaptiveDialog;