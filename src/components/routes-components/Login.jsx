import React from 'react';
import '../../css/login.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Login = () => {
    const [loginInfo, setloginInfo] = React.useState({
        username: '',
        password: ''
    });
    const [user, setUser] = React.useState([]);
    let history = useHistory();


    const saveLoginInfo = (e) =>{
        if(e.target.name === 'username'){
            setloginInfo({
                ...loginInfo,
                username: e.target.value,
            })
        } 
        if(e.target.name === 'password'){
            setloginInfo({
                ...loginInfo,
                password: e.target.value,
            })
        }
    }

    const onSubmit = () =>{
        axios.post('http://localhost:4000/login',loginInfo)
        .then(({data}) =>{
            console.log('hola');
            const flag = data.result.length;
            console.log(flag);
            if(flag > 0){
                setUser(data);
                console.log(data.token);
                localStorage.setItem('username', data.result[0].name_receptionist);
                localStorage.setItem("token", data.token);
                alert('Log In sucessfull, welcome');
                history.push('/home');
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
    <div className="login">
    <section class="register flex-center">
        <h1 className='title'>Log In</h1>
        <form action="" method="GET">
            <figure class="username">
                <p>Username</p>
                <input type="text" name="username" value={loginInfo.username} onChange={saveLoginInfo}/>
            </figure>
            <figure class="username">
                <p>Password</p>
                <input type="password" name="password" value={loginInfo.password} onChange={saveLoginInfo}/>
            </figure>
        </form>
        <button class="btn" onClick={onSubmit}>Log in</button>
        <div class="readyto flex-center terms">
            <p>All rights reserved</p>
            <p>HotelPosadaReal.com 2022</p>
        </div>
        <p>{console.log(loginInfo)}</p>
    </section>
    </div>
  )
}

export default Login