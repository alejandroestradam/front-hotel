import React from 'react';
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from '@material-ui/core';

const Popup = ({open, onClose, title, text, func, name}) => {
  return (
    <div>
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {text}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button name={name} onClick={(e)=>{onClose();func(e); console.log(e.target.name)}}>Yes</Button>
        <Button onClick={onClose} autoFocus>
            No
        </Button>
        </DialogActions>
    </Dialog>
</div>
  )
}

export default Popup;