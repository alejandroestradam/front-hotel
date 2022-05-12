import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import React from "react";
import Reservation from "./pages/reservation/Reservation";
import Profile from "./pages/profile/Profile";
import jwt_decode from "jwt-decode";

function App() {
  const [decoded, setDecoded] = React.useState('');

  React.useEffect(()=>{
    if(localStorage.getItem('token')){
      setDecoded(jwt_decode(localStorage.getItem('token')));
    }

},[])

  return (
    <div className="App">
      <Navbar decoded={decoded}/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login/*" element={<Login/>}/>
                <Route exact path="/signup/*" element={<Signup/>}/>
                <Route exact path="/reservation/*" element={<Reservation decoded={decoded}/>}/>
                <Route exact path="/profile/*" element={<Profile/>}/>
                <Route path='*' element={<Notfound replace/>}/>
            </Routes>
    </div>
  );
}

export default App;
