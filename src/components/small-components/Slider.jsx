import React from 'react';
import Carousel from 'react-material-ui-carousel';

const Slider = () => {
    var items = [
        {
            link: "https://i.pinimg.com/originals/ee/4c/20/ee4c2087d7dc0aa9df1c50874458af16.jpg",
            alt: "room"
        },
        {
            link: "https://digital.ihg.com/is/image/ihg/kimpton-miami-beach-5736825573-53x29",
            alt: "pool"
        },
        {
            link: "https://reliablewater247.com/wp-content/uploads/2016/05/hotel-restaurant-featured.jpg",
            alt: "restaurant"
        }
    ]

  return (
    <div className='slider'>
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    </div>
  )
}
function Item(props)
{
    return (
        
            <img src={props.item.link} alt={props.item.alt} width='100%' height='600px'/>
        
    )
}

export default Slider;