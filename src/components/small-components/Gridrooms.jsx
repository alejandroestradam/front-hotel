import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../css/gridrooms.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Gridrooms = () => {
    const [categories, setCategories] = React.useState([]);
    let navigate = useNavigate();

    React.useEffect(()=>{
        axios.get('http://localhost:4000/api/categories/obtain')
        .then(function (response) {
        setCategories(response.data);
        console.log(response.data[0].description);
        })
        .catch(function (error) {
        console.log(error);
        });
    },[])
    
  return (
    <div className='gridrooms'>
        <h1>Know our rooms!</h1>
        <div className="grid">
            {categories.map((obj, index)=>{
                return (
                <div className="category">
                    <Card sx={{ maxWidth: 350 , height: 550}}>
                        <CardMedia
                            component="img"
                            alt="room"
                            height="300"
                            image={categories[index].images_category[0]}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {categories[index].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='roomInfo'>
                                {categories[index].description}
                            </Typography>
                        </CardContent>
                        <div className='cardAction'>
                            <button className='book' onClick={()=>navigate('/reservation', { replace: true })}>Book Now</button>
                        </div>
                    </Card>
                </div>
                )
            })}
        </div>
        <p>{console.log(categories)}</p>
    </div>
  )
}

export default Gridrooms;