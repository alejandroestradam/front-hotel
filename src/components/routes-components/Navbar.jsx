import React from 'react';
import '../../css/navbar.css';
import { useHistory, Link } from "react-router-dom";

const Navbar = () => {
    const [name, setName] = React.useState('');
    const [isloggedIn, setisloggedIn] = React.useState(false);
    const [style, setStyle] = React.useState({
        backgroundcolor: '',
        display: ''
    });
    let history = useHistory();

    React.useEffect(()=>{
        setName(localStorage.getItem("username"));
    },[]);

    React.useEffect(()=>{
        let pathname = history.location.pathname;
        if(pathname === '/home'){
            setStyle({
                backgroundcolor: 'transparent',
                display: 'flex'
            })
        } else if (pathname === '/Login' || pathname === '/Signup'){
            setStyle({
                backgroundcolor: '#01a6e6',
                display: 'flex'
            })
        } else{
            setStyle({
                backgroundcolor: '#01a6e6',
                display: 'none'
            })
        }
    },[history.location.pathname]);


    React.useEffect(()=>{
        if(name){
            setisloggedIn(true);
        }
    },[name]);
    
    const logOut = () =>{
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        history.push('/home');
        window.location.reload(true);
    }

  return (
    <nav className="navbar" style={{backgroundColor: style.backgroundcolor, display: style.display}}>
        <div class="logo">
            <a href='/home' className="imglogo">
            <img src="https://hotelfrayjunipero.com/wp-content/uploads/2020/06/LogoHotelFray.png" alt='logo'/>
            </a>            
            <h1>Posada Real Hotel</h1>
        </div>
        <div id="login">
            {isloggedIn
            ?
            <div className="loginTrue">
                <button className="btn-logout" onClick={logOut}>Log out</button>
                <p>Welcome back {name}!</p>
                <img className="user" src="https://img.icons8.com/fluency-systems-regular/96/000000/user.png" width="30px" height="30px" alt="link"/>
            </div>
            :
            <div class="loginFalse">
                <div class="drop">
                <Link to="/Signup" className='links'>Sign up</Link>
                <Link to="/Login" className='links'>Log in</Link>
                </div>
                <img className="user" src="https://img.icons8.com/fluency-systems-regular/96/000000/user.png" width="30px" height="30px" alt="link"/>
            </div>}
        </div>
    </nav>
  )
}

export default Navbar