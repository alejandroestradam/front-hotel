import React from 'react';
import '../../css/notfound.css'
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className='notfound'>
        <div className="logo">
            <img src="https://hotelfrayjunipero.com/wp-content/uploads/2020/06/LogoHotelFray.png" alt='logo'/>         
            <h1 className='title'>Posada Real Hotel</h1>
        </div>
        <div className='goback'>
            <h1 className='oops'>Oops! The page you were looking for don't exist.</h1>
            <Button variant="contained" color='primary' onClick={()=>navigate('/', { replace: true })}>Go back</Button>
        </div>
    </div>
  )
}

export default Notfound