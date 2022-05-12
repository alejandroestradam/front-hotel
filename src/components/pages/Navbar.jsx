import React from 'react';
import '../../css/navbar.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = ({decoded}) => {
    const [name, setName] = React.useState('');
    const [isloggedIn, setisloggedIn] = React.useState(false);
    const [style, setStyle] = React.useState({
        backgroundcolor: '',
        display: ''
    });
    const location = useLocation();
    let navigate = useNavigate();

    React.useEffect(()=>{
        setName(decoded.name);
    },[decoded]);

    React.useEffect(()=>{
        console.log(location.pathname);
        if(location.pathname === '/'){
            setStyle({
                backgroundcolor: 'transparent',
                display: 'flex'
            })
        } else if (location.pathname === '/Login'){
            setStyle({
                backgroundcolor: '#01a6e6',
                display: 'flex',
                displaySignup: 'flex',
                displayLogIn: 'none'
            })
        } else if(location.pathname === '/Signup'){
            setStyle({
                backgroundcolor: '#01a6e6',
                display: 'flex',
                displaySignup: 'none',
                displayLogIn: 'flex'
            })
        
        }else if(location.pathname === '/reservation'){
            setStyle({
                backgroundcolor: '#01a6e6',
                display: 'flex',
                displaySignup: 'none',
                displayLogIn: 'flex',
                displayLogOut: 'flex',
                displayProfile: 'flex'
            })
        
        }else if(location.pathname === '/profile' || location.pathname === '/profile/profileinfo' || location.pathname === '/profile/reservations' || location.pathname === '/profile/security'){
            setStyle({
                backgroundcolor: '#01a6e6',
                display: 'flex',
                displaySignup: 'none',
                displayLogIn: 'flex',
                displayLogOut: 'none',
                displayProfile: 'none'

            })
        
        }else{
            setStyle({
                backgroundcolor: '#01a6e6',
                display: 'none'
            })
        }

    },[location]);


    React.useEffect(()=>{
        if(name){
            setisloggedIn(true);
        }
    },[name]);
    
    const logOut = () =>{
        localStorage.removeItem('token');
        navigate('/', { replace: true });
        window.location.reload(true);
    }

  return (
    <nav className="navbar" style={{backgroundColor: style.backgroundcolor, display: style.display}}>
        <div className="logo">
            <a href='/' className="imglogo">
            <img src="https://hotelfrayjunipero.com/wp-content/uploads/2020/06/LogoHotelFray.png" alt='logo'/>
            </a>            
            <h1 className='navTitle'>Posada Real Hotel</h1>
        </div>
        <div id="login">
            {isloggedIn
            ?
            <div className="loginTrue">
                <button className="btn-logout" onClick={logOut} style={{display: style.displayLogOut}}>Log out</button>
                <button className="btn-logout" onClick={() => navigate('/profile', { replace: true })} style={{display: style.displayProfile}}>Profile</button>
                <p>Welcome {name.slice(0, name.indexOf(' '))}!</p>
                <img className="user" src="https://img.icons8.com/fluency-systems-regular/96/000000/user.png" width="30px" height="30px" alt="link"/>
            </div>
            :
            <div className="loginFalse">
                <div className='drop'>
                <Link to="/Signup" className='links'  style={{display: style.displaySignup}}>Sign up</Link>
                <Link to="/Login" className='links'  style={{display: style.displayLogIn}}>Log in</Link>
                </div>
                <img className="user" src="https://img.icons8.com/fluency-systems-regular/96/000000/user.png" width="30px" height="30px" alt="link"/>
            </div>}
        </div>
    </nav>
  )
}

export default Navbar