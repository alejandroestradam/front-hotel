import React from 'react';
import '../../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';

const Login = () => {
    const [loginInfo, setloginInfo] = React.useState({
        email: '',
        password: ''
    });
    const [user, setUser] = React.useState([]);
    const [block, setBlock] = React.useState(true);

    let navigate = useNavigate();


 /* Checking if the user is logged in. If the user is logged in, it will redirect the user to the home
 page. */
    React.useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/', { replace: true });
        }
      },[])


/**
 * The function takes in an event, and if the event's target's name is equal to email, then it sets the
 * loginInfo state's email property to the event's target's value. If the event's target's name is
 * equal to password, then it sets the loginInfo state's password property to the event's target's
 * value. If the loginInfo state's email property's length is not equal to 0 and the loginInfo state's
 * password property's length is not equal to 0, then it sets the block state to false. If the
 * loginInfo state's email property's length is equal to 0 or the loginInfo state's password property's
 * length is equal to 0, then it sets the block state to true
 */
    const saveLoginInfo = (e) =>{
        if(e.target.name === 'email'){
            setloginInfo({
                ...loginInfo,
                email: e.target.value,
            })
        } 
        if(e.target.name === 'password'){
            setloginInfo({
                ...loginInfo,
                password: e.target.value,
            })
        }
        if(loginInfo.email.length !== 0 && loginInfo.password.length !== 0){
            setBlock(false);
        }else{
            setBlock(true);
        }
    }
/**
 * The function onSubmit() is called when the user clicks the login button. It sends a post request to
 * the server with the login information. If the login is successful, the user is redirected to the
 * home page and the page is refreshed. If the login is unsuccessful, an error message is displayed
 */

    const onSubmit = () =>{
        axios.post('http://localhost:4000/api/client/login',loginInfo)
        .then(({data}) =>{
            setUser(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("Password", loginInfo.password);
            navigate('/', { replace: true });
            window.location.reload(true);
        })
        .catch(({response}) =>{
            toast.error(response.data);
        });
    }

  return (
      <>
      <ToastContainer autoClose={2000}/>
        <div className="login">
        <section class="register flex-center">
            <h1 className='title'>Log In</h1>
            <form action="" method="GET">
                <figure class="username">
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="text" value={loginInfo.email} onChange={saveLoginInfo} size="small" name='email'/>
                </figure>
                <figure class="username">
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={loginInfo.password} onChange={saveLoginInfo} size="small" name='password'/>
                </figure>
            </form>
            <Button disabled={block} onClick={onSubmit} variant="contained">Log in</Button>
            <div class="readyto flex-center terms">
                <p>All rights reserved</p>
                <p>HotelPosadaReal.com 2022</p>
            </div>
            <p>{console.log(loginInfo)}</p>
        </section>
        </div>
    </>
  )
}

export default Login