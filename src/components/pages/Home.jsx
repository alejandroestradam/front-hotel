import React from 'react';
import Slider from '../small-components/Slider';
import '../../css/home.css';
import Gridrooms from '../small-components/Gridrooms';
import { useNavigate } from 'react-router-dom';
import { items } from '../../helpers/variables';
import Footer from '../small-components/Footer';


const Home = () => {
  let navigate = useNavigate();
  return (
    <>
    <div className='home'>
      <div className="slider">
        <Slider
          items={items}
          width='100%' 
          height='600px'
        />
        <button className='btn-book' onClick={()=>navigate('/reservation', { replace: true })}>Book now</button>
      </div>
      <div className="description">
        <h2>Posada Real Hotel</h2>
        <p>The stage is set in Guadalajara for a destination hotel unlike any other. Posada Real Hotel offers VIP experiences like Body Rock® Fitness Center, relaxing Rock Spa®, legendary Rock Shop® and an infinity sky pool on the top of the hotel. Events are an epic experience, with more than 7,000 square meters of edgy space inside the hotel and out in the fresh air. The property also offers an exclusive shopping area, as well as 12 movie theaters. Posada Real Hotel is the Western Mexico's premier place to live it up.</p>
      </div>
      <div className="rooms">
        <Gridrooms/>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default Home;