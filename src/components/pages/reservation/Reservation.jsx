import React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../../../css/reservation.css';
import {Select, InputLabel, MenuItem, FormControl, Card, CardMedia, CardContent, Typography, CardActions, Modal, Box, TextField} from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from '../../small-components/Slider';
import { roomicons } from '../../../helpers/variables';
import Footer from '../../small-components/Footer';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import { toast, ToastContainer } from 'react-toastify';

const style = {
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

const Reservation = ({decoded}) => {
    const [categories, setCategories] = React.useState([]);
    const [newCaregories, setnewCategories] = React.useState([]);
    const [token, setToken] = React.useState('');
    const [block, setBlock] = React.useState(true);
    const [blockCard, setblockCard] = React.useState(true);
    const [numberErr, setnumberErr] = React.useState(false);
    const [cvcErr, setcvcErr] = React.useState(false);
    const [numberMsg, setnumberMsg] = React.useState(false);
    const [cvcMsg, setcvcMsg] = React.useState(false);
    const[display, setDisplay] = React.useState('flex');
    const [cardInfo, setcardInfo] = React.useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
    })
    const [reservation, setReservation] = React.useState({
        email: '',
        guests: '',
        startDate: '',
        endDate: '',
        roomType: '',
        cost: '',
        number: '',
        name: ''
    });
    const [days, setDays] = React.useState(0);
    const [focus, setFocus] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

/**
 * It takes an event as an argument, and then it checks if the event's target name is equal to date. If
 * it is, it sets the reservation state to the event's startDate and endDate. If it isn't, it sets the
 * reservation state to the event's target name and value
 */
    const handleChange = (e) => {
        if(e.target.name === 'date'){
            setReservation({
                ...reservation, 'startDate': e.target.startDate, 'endDate': e.target.endDate
            })
        }else{
            setReservation({
                ...reservation,[e.target.name]:e.target.value
              })
        }
        if(!token){
            toast.error('You need to be logged in to do reservations');
        }
    };
/**
 * A function that handles the card information.
 */
    const handleCardinfo = (e) => {
            if(e.target.name === 'number' || e.target.name === 'name'){
                setReservation({
                    ...reservation,[e.target.name]:e.target.value
                  })
            }
            setcardInfo({
                ...cardInfo,[e.target.name]:e.target.value
              })
    };
/**
 * It saves the reservation to the database.
 */
    const saveReservation = () =>{
        console.log(decoded.email);
        console.log(reservation.email);
        axios.post('http://localhost:4000/api/reservations/create',reservation)
        .then(({data}) =>{
            //setUser(data);
            alert('Reservation succesfull');
            //navigate('/', { replace: true });
            window.location.reload(true);
        })
        .catch(({response}) =>{
            toast.error(response.data);
        });
    };
    
/* Setting the email of the reservation to the email of the user that is logged in. */
    React.useEffect(()=>{
        setReservation({...reservation, email: decoded.email});
    },[decoded]);

/* Checking if the reservation object is empty or not. If it is empty, it will set the block state to
true. If it is not empty, it will set the block state to false. */
    React.useEffect(()=>{
        if(reservation.startDate.length === 0 || reservation.endDate.length === 0 || reservation.guests.length === 0 || !token){
            setBlock(true);
        }else{
            setBlock(false);
        }
        if(reservation.startDate.length !== 0){
            setDays((reservation.endDate.getTime() - reservation.startDate.getTime()) / (1000*60*60*24));
        }
        if(reservation.guests >2){
            setDisplay('none');
        }else{
            setDisplay('flex');
        }
        console.log(reservation);
    },[reservation]);

/* Updating the cost of the reservation based on the room type. */
    React.useEffect(()=>{
        if(reservation.roomType === 'Superior'){
            setReservation({...reservation, cost: 1500 * days});
        }
        if(reservation.roomType === 'Junior'){
            setReservation({...reservation, cost: 1000 * days});
        }
        if(reservation.roomType === 'Imperial Suite'){
            setReservation({...reservation, cost: 2000 * days});
        }

    },[reservation.roomType]);

/* Using the useEffect hook to run a function when the component mounts. */
    React.useEffect(()=>{
        setToken(localStorage.getItem('token'));
        axios.get('http://localhost:4000/api/categories/obtain')
        .then(function (response) {
        setCategories(response.data);
        console.log(response.data);
        })
        .catch(function (error) {
        console.log(error);
        });
    },[])
/* The above code is a React hook that is checking the length of the card number and cvc. If the length
is greater than 16 or 3, it will set the error to true and set the error message. If the length is
less than 16 or 3, it will set the error to false and set the error message to an empty string. If
the card number, cvc, name, or expiry is empty, it will set the block card to true. If the card
number or cvc is greater than 16 or 3, it will set the block card to true. */
    React.useEffect(()=>{
        console.log(cardInfo.number.length > 16);
        if(cardInfo.number.length > 16){
            setnumberErr(true);
            setnumberMsg('Write 16 digits');
        } else{
            setnumberErr(false);
            setnumberMsg('');
        }
        if(cardInfo.cvc.length > 3){
            setcvcErr(true);
            setcvcMsg('Write 3 digits');
        }else{
            setcvcErr(false);
            setcvcMsg('');
        }
        if(cardInfo.name.length === 0 || cardInfo.number.length === 0 || cardInfo.expiry.length === 0 || cardInfo.cvc.length === 0){
            setblockCard(true);
        } else if(cardInfo.number.length > 16 || cardInfo.cvc.length > 3){
            setblockCard(true);
        }else{
            setblockCard(false);
        }
        console.log(cardInfo);
    },[cardInfo]);

  return (
    <div className='reservation'>
        <ToastContainer autoClose={2000}/>
        <h1>Make a reservation</h1>
        <div className="reservationinfo">
            <div className="datepicker">
                <DateRangePickerComponent
                    placeholder='Enter date range'
                    min={new Date()}
                    startDate={reservation.startDate}
                    endDate={reservation.endDate}
                    name = 'date'
                    onChange={handleChange}
                />
            </div>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Number of guests</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reservation.guests}
                label="Number of guests"
                onChange={handleChange} 
                className="selectguest"
                name='guests'
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>
        </div>
        {categories.map((obj, index)=>{
                return (
                <div className="roomCard" style={{display: display}}>
                    <Card  className='roominformation'>
                        <CardMedia className="cardImage">
                            <img src={categories[index].images_category} alt="room" height='300px' width='100%'/> 
                        </CardMedia>
                        <CardContent className='cardContent'>
                            <Typography gutterBottom variant="h5" component="div">
                                {categories[index].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {categories[index].description}
                            </Typography>
                            <div className="highlights">
                                {categories[index].highlights.map((obj, jindex)=>{
                                    return(
                                        <div className="highlight">
                                            <img src={roomicons[jindex]} alt="icon" width="18px" height="18px"/>
                                            <Typography variant="body2">{categories[index].highlights[jindex]}</Typography>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="bottom">
                                <div className="moreinfos">
                                    <div className="moreinfo">
                                        <Typography variant="body1" color="text.secondary">
                                            Capacity: {categories[index].capacity} 
                                        </Typography>
                                        <img src="https://img.icons8.com/material-outlined/24/000000/conference-call.png" alt="icon" width="18px" height="18px"/>
                                    </div>
                                    <div className="moreinfo">
                                        <Typography variant="body1" color="text.secondary">
                                            Area: {categories[index].area} 
                                        </Typography>
                                        <img src="https://img.icons8.com/material-outlined/24/000000/studio-floor-plan.png" alt="icon" width="18px" height="18px"/>
                                    </div>
                                    <div className="moreinfo">
                                        <Typography variant="body1" color="text.secondary">
                                            Floor: {categories[index].floors} 
                                        </Typography>
                                        <img src="https://img.icons8.com/windows/32/000000/parking-and-1st-floor.png" alt="icon" width="18px" height="18px"/>
                                    </div>
                                    <div className="moreinfo">
                                        <Typography variant="body1" color="text.secondary">
                                            Beds: {categories[index].beds} 
                                        </Typography>
                                        <img src="https://img.icons8.com/material-outlined/24/000000/bed.png" alt="icon" width="18px" height="18px"/>
                                    </div>
                                </div>
                                <div className="available">
                                    <h3>Available!</h3>
                                </div>
                            </div>
                        </CardContent>
                        <CardActions className='cardActions'>
                            <div className="top">
                                <Typography variant="subtitle1">Price per night</Typography>
                                <Typography variant="h6">${categories[index].cost}.00</Typography>
                            </div>
                            <button disabled={block} className='book' onClick={()=>{setReservation({...reservation, roomType: categories[index].name});handleOpen()}} color="primary">Book Now</button>
                        </CardActions>
                    </Card>
                </div>
                )
            })}
            <Footer/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Reservation info:
                    </Typography>
                    <Typography id="modal-modal-description" variant="subtitle1">
                        Room Type: {reservation.roomType}
                    </Typography>
                    <Typography id="modal-modal-description" variant="subtitle1">
                        Guests: {reservation.guests}
                    </Typography>
                    {
                        typeof reservation.startDate === 'object'
                        ?
                        <Typography id="modal-modal-description" variant="subtitle1">
                            Date: {reservation.startDate.toISOString().substring(0, 10)} - {reservation.endDate.toISOString().substring(0, 10)}
                        </Typography>
                        :
                        <Typography id="modal-modal-description" variant="subtitle1"></Typography>
                    }
                    <Typography id="modal-modal-description" variant="subtitle1">
                        Parcial Cost: ${reservation.cost}.00
                    </Typography>
                    <Typography id="modal-modal-description" variant="subtitle1">
                        IVA: ${reservation.cost * 0.16}
                    </Typography>
                    <Typography id="modal-modal-description" variant="subtitle1">
                        Total Cost: ${(reservation.cost * 1.16).toFixed(2)}
                    </Typography>
                    <div className="card">
                        <Typography id="modal-modal-description" variant="h6">
                            Card Info:
                        </Typography>
                        <p></p>
                        <Cards
                            number={cardInfo.number}
                            name={cardInfo.name}
                            expiry={cardInfo.expiry}
                            cvc={cardInfo.cvc}
                            focused={focus}
                        />
                        <div className="cardinfo">
                            <TextField error={numberErr} helperText={numberMsg} id="outlined-basic" label="Card Number" variant="outlined" type="text" value={cardInfo.number} onChange={handleCardinfo} size="small" name='number' onFocus={e => setFocus(e.target.name)}/>
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" type="text" value={cardInfo.name} onChange={handleCardinfo} size="small" name='name' onFocus={e => setFocus(e.target.name)}/>
                            <div className="dateinput">
                            <TextField id="outlined-basic" label="Expiration Date" variant="outlined" type="text" value={cardInfo.expiry} onChange={handleCardinfo} size="small" name='expiry' onFocus={e => setFocus(e.target.name)}/>
                            </div>

                            <TextField error={cvcErr} helperText={cvcMsg} id="outlined-basic" label="CVC" variant="outlined" type="text" value={cardInfo.cvc} onChange={handleCardinfo} size="small" name='cvc' onFocus={e => setFocus(e.target.name)}/>
                        </div>
                    </div>
                    <div className="confirm">
                        <button disabled={blockCard} className='book' onClick={saveReservation}>Confirm</button>
                    </div>
                </Box>
            </Modal>
    </div>
  )
}

export default Reservation;