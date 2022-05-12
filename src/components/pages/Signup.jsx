import React from 'react';
import '../../css/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, OutlinedInput, InputLabel } from '@material-ui/core';
import { country_list } from '../../helpers/variables';
import { ToastContainer, toast } from 'react-toastify';



const Signup = () => {
    const [signupInfo, setsignupInfo] = React.useState({
        name: '',
        email: '',
        cellphone: '',
        country: '',
        password: '',
    });
    const [password2, setPassword2] = React.useState('');
    const [user, setUser] = React.useState([]);
    const [block, setBlock] = React.useState(true);
    
    let navigate = useNavigate();
    
/* Checking if the user is logged in, if it is, it redirects to the home page. */
    React.useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/', { replace: true });
        }
      },[])

/**
 * It saves the signup information in the state.
 */
    const saveSignupInfo = (e) =>{
        setsignupInfo({
            ...signupInfo,[e.target.name]:e.target.value
          })
        if(signupInfo.name.length !== 0 && signupInfo.email.length !== 0 && signupInfo.cellphone.length !== 0 && signupInfo.country.length !== 0 && signupInfo.password.length !== 0 && password2.length !== 0){
            setBlock(false);
        }else{
            setBlock(true);
        }
    }
/**
 * If the name, email, cellphone, country, password, and password2 fields are not empty, then the
 * button is not disabled
 */
    const handleChange = () =>{
        if(signupInfo.name.length !== 0 && signupInfo.email.length !== 0 && signupInfo.cellphone.length !== 0 && signupInfo.country.length !== 0 && signupInfo.password.length !== 0 && password2.length !== 0){
            setBlock(false);
        }else{
            setBlock(true);
        }
    }
/**
 * If the password and password2 fields don't match, display an error message and block the user from
 * signing up
 */
    const compare = () =>{
        if(signupInfo.password !== password2){
            toast.error("Passwords don't match");
            setBlock(true);
        }else{
            setBlock(false);
        }
    }

/**
 * A function that is called when the user clicks the submit button. It sends the information to the
 * server and if the server accepts the information, it will send back a response. If the response is
 * successful, it will alert the user that the registration was successful and will redirect the user
 * to the login page. If the response is not successful, it will alert the user that the registration
 * was not successful.
 */
    const onSubmit = () =>{
        console.log(signupInfo);
        axios.post('http://localhost:4000/api/client/signup',signupInfo)
        .then(({data}) =>{
            setUser(data);
            alert('Register sucessfull, now you can Log in');
            navigate('/', { replace: true });
            window.location.reload(true);
        })
        .catch(({response}) =>{
            toast.error(response.data);
        });
    }

React.useEffect(()=>{
    console.log(password2)
},[password2]);

  return (
    <div className="sign">
        <ToastContainer autoClose={2000}/>
    <section class="signup flex-center">
        <h1 className='title'>Sign up</h1>
        <form action="" method="GET" className='inputs'>
            <figure class="input">
                <TextField id="outlined-basic" label="Full Name" variant="outlined" type="text" value={signupInfo.name} onChange={saveSignupInfo} size="small" name='name' className='select'/>
            </figure>
            <figure class="input">
                <TextField id="outlined-basic" label="Email" variant="outlined" type="text" value={signupInfo.email} onChange={saveSignupInfo} size="small" name='email' className='select'/>
            </figure>
            <figure class="input">
                <TextField id="outlined-basic" label="Cellphone" variant="outlined" type="text" value={signupInfo.cellphone} onChange={saveSignupInfo} size="small" name='cellphone' className='select'/>
            </figure>
            <figure class="input">
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={signupInfo.country}
                    label="Country"
                    input={<OutlinedInput label="Name" />}
                    onChange={saveSignupInfo}
                    name='country'
                    className='select'
                >
                    {country_list.map((obj, index)=>(
                        <MenuItem value={country_list[index]}>{country_list[index]}</MenuItem>
                    ))}
                </Select>
            </figure>
            <figure class="input">
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={signupInfo.password} onChange={saveSignupInfo} size="small" name='password' className='select'/>
            </figure>
            <figure class="input">
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" value={password2} onChange={(e)=>{setPassword2(e.target.value); handleChange()}} onBlur={compare} size="small" name='password2' className='select'/>
            </figure>
        </form>
        <Button disabled={block} onClick={onSubmit} variant="contained" className='submit' color='primary'>Submit</Button>
        <div class="readyto flex-center terms">
            <p>All rights reserved</p>
            <p>HotelPosadaReal.com 2022</p>
        </div>
    </section>
    </div>
  )
}

export default Signup;