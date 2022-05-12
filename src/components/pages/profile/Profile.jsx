import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/profile.css'
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import Reservations from './Reservations';
import Security from './Security';
import jwt_decode from "jwt-decode";


const Profile = () => {
    const [decoded, setDecoded] = React.useState('');
    const navigate = useNavigate();

/* A hook that is called when the component is mounted. It is used to decode the token and set the
decoded token to the state. */
    React.useEffect(()=>{
      setDecoded(jwt_decode(localStorage.getItem('token')));
  },[])

/* Checking if the user is logged in. If not, it redirects to the login page. */
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
    }

  return (
    <div className='profile'>
        <Sidebar/>
          <Routes>
                <Route exact path={"/profileinfo"} element={<ProfileInfo decoded={decoded}/>}/>
                <Route exact path={"/reservations"} element={<Reservations decoded={decoded}/>}/>
                <Route exact path={"/security"} element={<Security decoded={decoded}/>}/>
          </Routes>
    </div>
  )
}

export default Profile