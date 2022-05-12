import React from 'react';
import {TableContainer, Table, TableRow, TableCell, TableBody, Paper, Typography, TextField, Modal, Box} from '@material-ui/core';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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

const Security = ({decoded}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [password, setPassword] = React.useState('⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎');
  const [isClicked, setisClicked] = React.useState(false);
  const [update, setUpdate] = React.useState({
      _id: '',
      password: '',
  })


/**
 * It updates the client information.
 */
const handeClick = (e) =>{
    axios.put('http://localhost:4000/api/client/updateclient', update)
    .then(function (response) {
    alert('Client Updated');
    window.location.reload(true);
    })
    .catch(function (error) {
    console.log(error.response);
    });
}

const handleChange = (e) =>{
    setUpdate({
        ...update, [e.target.name] : e.target.value
    })
}
/**
 * If the button is clicked, the password is shown. If the button is not clicked, the password is
 * hidden
 */
const showPassword = () =>{
  setisClicked(true);
  setPassword(localStorage.getItem('Password'))
}
const hidePassword = () =>{
  setisClicked(false);
  setPassword('⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎');
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
                    <TableCell component="th" scope="row">Password:</TableCell>
                    <TableCell align="left" className='pass'>{password}</TableCell>
                    {isClicked
                    ?
                      <TableCell align="left">
                        <button onClick={hidePassword}><VisibilityOffIcon/></button>
                      </TableCell>
                    :
                      <TableCell align="left">
                        <button onClick={showPassword}><RemoveRedEyeIcon/></button>
                      </TableCell>
                    }
                    <TableCell align="left">
                        <button className='update-btn' name='name' onClick={(e)=>{handleOpen()}}></button>
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

export default Security;