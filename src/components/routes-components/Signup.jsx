import React from 'react';
import '../../css/signup.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Signup = () => {
    const [signupInfo, setsignupInfo] = React.useState({
        username: '',
        password: ''
    });
    const [user, setUser] = React.useState([]);
    let history = useHistory();


    const saveLoginInfo = (e) =>{
        if(e.target.name === 'username'){
            setsignupInfo({
                ...signupInfo,
                username: e.target.value,
            })
        }
        if(e.target.name === 'password'){
            setsignupInfo({
                ...signupInfo,
                password: e.target.value,
            })
        }
    }

    const onSubmit = () =>{
        axios.post('http://localhost:4000/login',signupInfo)
        .then(({data}) =>{
            console.log('hola');
            const flag = data.result.length;
            console.log(flag);
            if(flag > 0){
                setUser(data);
                console.log(data);
                alert('Register sucessfull, now you can Log in');
                history.push('/login');
                window.location.reload(true);
            }else{
                alert('User not found');
            }
            console.log(data);
        })
        .catch(({response}) =>{
            alert('User not found');
            console.log(response);
        });
    }



  return (
    <div className="sign">
    <section class="signup flex-center">
        <h1 className='title'>Sign up</h1>
        <form action="" method="GET" className='inputs'>
            <figure class="input">
                <p>Name</p>
                <input type="text" name="name" value={signupInfo.name} onChange={saveLoginInfo}/>
            </figure>
            <figure class="input">
                <p>Last Name</p>
                <input type="text" name="lastname" value={signupInfo.lastname} onChange={saveLoginInfo}/>
            </figure>
            <figure class="input">
                <p>Email</p>
                <input type="text" name="email" value={signupInfo.email} onChange={saveLoginInfo}/>
            </figure>
            <figure class="input">
                <p>Cellphone</p>
                <input type="number" name="cell" value={signupInfo.cell} onChange={saveLoginInfo}/>
            </figure>
            <figure class="input">
                <p>Country</p>
                <input type="text" name="country" value={signupInfo.country} onChange={saveLoginInfo}/>
            </figure>
            <figure class="input">
                <p>Birth Date</p>
                <input type="date" name="datebirth" value={signupInfo.datebirth} onChange={saveLoginInfo}/>
            </figure>
            <figure class="input">
                <p>Confirm Password</p>
                <input type="password" name="password1" value={signupInfo.password1} onChange={saveLoginInfo}/>
            </figure>
            <figure class="input">
                <p>Confirm Password</p>
                <input type="password" name="password2" value={signupInfo.password2} onChange={saveLoginInfo}/>
            </figure>
        </form>
        <button class="btn" onClick={onSubmit}>Sign up</button>
        <div class="readyto flex-center terms">
            <p>All rights reserved</p>
            <p>HotelPosadaReal.com 2022</p>
        </div>
        <p>{console.log(signupInfo)}</p>
    </section>
    </div>
  )
}

export default Signup;