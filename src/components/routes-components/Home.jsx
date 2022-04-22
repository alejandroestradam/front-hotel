import React from 'react';
import Slider from '../small-components/Slider';
import '../../css/home.css';
import Gridrooms from '../small-components/Gridrooms';


const Home = () => {


  return (
    <div className='home'>
      <div className="slider">
        <Slider/>
        <button className='btn-book'>Book now</button>
      </div>
      <div className="description">
        <h2>Posada Real Hotel</h2>
        <p>The stage is set in Guadalajara for a destination hotel unlike any other. Posada Real Hotel offers VIP experiences like Body Rock® Fitness Center, relaxing Rock Spa®, legendary Rock Shop® and an infinity sky pool on the top of the hotel. Events are an epic experience, with more than 7,000 square meters of edgy space inside the hotel and out in the fresh air. The property also offers an exclusive shopping area, as well as 12 movie theaters. Posada Real Hotel is the Western Mexico's premier place to live it up.</p>
      </div>
      <div className="rooms">
        <Gridrooms/>
      </div>
    </div>
  )
}

export default Home;