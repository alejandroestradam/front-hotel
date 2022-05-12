import React from 'react';
import axios from 'axios';
import {Card, CardMedia, CardContent, Typography, CardActions} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import Popup from './Popup';
import '../../../css/profile.css';

const Reservations = ({decoded}) => {
  const[reservations, setReservations] = React.useState([]);
  const[email, setEmail] = React.useState('');
  const [open, setOpen] = React.useState(false);

/**
 * It opens and closes the modal.
 */
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

/* Setting the email state to the email of the user. */
  React.useEffect(()=>{
    console.log(decoded.email);
    setEmail(decoded.email);
  },[decoded])

/* Making a post request to the server to get the reservations of the user. */
  React.useEffect(()=>{
    console.log(email);
    axios.post('http://localhost:4000/api/reservations/email',{email: email})
    .then(function (response) {
    setReservations(response.data);
    console.log(response.data);
    })
    .catch(function (error) {
    console.log(error);
    });
  },[email]);

/**
 * It deletes a reservation from the database.
 */
  const deleteReservation = (e) =>{
    console.log(e.target.name);
    axios.delete('http://localhost:4000/api/reservations/delete',{
      data: {
          _id: e.target.name,
      }
  })
    .then(function (response) {
    window.location.reload(true);
    toast.success('Reservation deleted');
    console.log(response.data);
    })
    .catch(function (error) {
    console.log(error);
    });
  }


  return (
    <div className="profileinfo">
      <ToastContainer autoClose={2000}/>
        <h1>Reservations</h1>
        <div className="reservationCards">
        {reservations.map((obj, index)=>{
                return (
                <div className="roomCard">
                    <Card  className='reservationInfo'>
                        <CardMedia className="cardImage">
                            <img src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/66942710.jpg?k=32f7ed71dbfbafd23b3b7081480ce367414cccb770532e4bba9634c59efb995c&o=" alt="room" height='300px' width='100%'/> 
                        </CardMedia>
                        <CardContent className='reservationContent'>
                            <Typography gutterBottom variant="h6" component="div">
                                Room Type: {reservations[index].roomType}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Total guests: {reservations[index].guests}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Date: {reservations[index].startDate.slice(0, reservations[index].startDate.indexOf('T'))} - {reservations[index].endDate.slice(0, reservations[index].startDate.indexOf('T'))}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Payment Method: {reservations[index].cardnumber}
                            </Typography>
                            <Typography variant="h6">Total cost: ${reservations[index].cost}.00</Typography>
                        </CardContent>
                        <CardActions className='cardActions'>
                            <button className='btn-error' name={reservations[index]._id} onClick={handleClickOpen} color="red">Cancel Reservation</button>
                        </CardActions>
                    </Card>
                    <Popup
                      open={open}
                      onClose={handleClose}
                      text='Are you sure you want to delete this reservation?'
                      title='Confirmation'
                      func = {deleteReservation}
                      name = {reservations[index]._id}
                    />
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default Reservations;