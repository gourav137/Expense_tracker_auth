import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import { APIUrl, handleError, handleSucess } from '../utils';

function Login() {

    const navigate = useNavigate();
    // use state 
    const [LoginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });


    // live changes 
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...LoginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }


    // handle login info main imposter
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = LoginInfo;
        if (!email || !password) {
            return handleError('email and password are required');

        }
        try {
            const url = `${APIUrl}auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name } = result;
                 console.log(success,message,jwtToken,name);
            if (success) {
                handleSucess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('Logged in user', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000);
            }
        }
        catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin} >
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='email'
                        placeholder='enter email' />
                </div>
                <div>
                    <label htmlFor='password'>password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='enter your password' />
                </div>
                <button type='submit'>Login</button>
                <span>Dont have account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
<ToastContainer/>
        </div>
    )
}

export default Login