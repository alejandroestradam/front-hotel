import React from 'react';
import Carousel from 'react-material-ui-carousel';

const Slider = ({items, width, height}) => {

  return (
    <div className='slider'>
        <Carousel autoPlay={false}>
            {
                items.map( (item, i) => <Item key={i} item={item} width={width} height={height}/> )
            }
        </Carousel>
    </div>
  )
}
function Item(props)
{
    return (
        
            <img src={props.item} alt='room' width={props.width} height={props.height}/>
        
    )
}

export default Slider;