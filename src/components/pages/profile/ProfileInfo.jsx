import React from 'react';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, TextField, Modal, Box} from '@material-ui/core';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import '../../../css/profile.css';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ProfileInfo = ({decoded}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userInfo, setuserInfo] = React.useState('');
    const [value, setValue] = React.useState('');
    const [update, setUpdate] = React.useState({
        _id: '',
        name: '',
    })
    

/* A React hook that is called when the component is mounted. It is used to fetch the user information
from the database. */
    React.useEffect(()=>{
        axios.post('http://localhost:4000/api/client/getclient', {email: decoded.email})
        .then(function (response) {
        setuserInfo(response.data);
        })
        .catch(function (error) {
        console.log(error.response);
        });
        setUpdate({
            ...update, _id : decoded._id
        });
    },[decoded]);

/**
 * The above function is a function that is called when the user clicks the update button. It sends a
 * put request to the server with the updated information.
 */
    const handeClick = (e) =>{
        axios.put('http://localhost:4000/api/client/updateclient', update)
        .then(function (response) {
        setuserInfo(response.data);
        alert('Client Updated');
        window.location.reload(true);
        })
        .catch(function (error) {
        console.log(error.response);
        });
    }
/**
 * A function that takes in an event and sets the state of the update object to the value of the event.
 */
    const handleChange = (e) =>{
        setUpdate({
            ...update, [e.target.name] : e.target.value
        })
    }

    React.useEffect(()=>{
        console.log(update);
    },[update])

  return (
    <div className="profileinfo">
        <Typography variant='h4'>Personal Information</Typography>
        <p></p>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Name:</TableCell>
                    <TableCell align="left">{userInfo.name}</TableCell>
                    <TableCell align="left">
                        <button className='update-btn' name='name' onClick={(e)=>{handleOpen();setValue(e.target.name)}}></button>
                    </TableCell>
                </TableRow>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Email:</TableCell>
                    <TableCell align="left">{userInfo.email}</TableCell>
                    <TableCell align="left">
                        <button className='update-btn' name='email' onClick={(e)=>{handleOpen();setValue(e.target.name)}}></button>
                    </TableCell>
                </TableRow>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Cellphone:</TableCell>
                    <TableCell align="left">{userInfo.cellphone}</TableCell>
                    <TableCell align="left">
                        <button className='update-btn' name='cellphone' onClick={(e)=>{handleOpen();setValue(e.target.name)}}></button>
                    </TableCell>
                </TableRow>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">Country:</TableCell>
                    <TableCell align="left">{userInfo.country}</TableCell>
                    <TableCell align="left">
                        <button className='update-btn' name='country' onClick={(e)=>{handleOpen();setValue(e.target.name)}}></button>
                    </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Write the new value:
                    </Typography>
                    <div className="cardinfo">
                        <TextField  id="outlined-basic" label='Name' variant="outlined" type="text" value={update.name} onChange={handleChange} size="small" name='name'/>
                    </div>
                    <div className="confirm">
                        <button className='book' onClick={handeClick}>Confirm</button>
                    </div>
                </Box>
        </Modal>
    </div>
  )
}

export default ProfileInfo;