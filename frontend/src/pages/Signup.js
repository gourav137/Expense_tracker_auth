import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import {  APIUrl,handleError, handleSucess } from '../utils';
function Signup() {

    const [signUpInfo, setsignUpInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    //
    const navigate = useNavigate();
    // to get the value inserted by the user 
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copysignUpInfo = { ...signUpInfo };
        copysignUpInfo[name] = value;
        setsignUpInfo(copysignUpInfo);
    }


    console.log('login info->', signUpInfo);
    // to handle and send the value to the api
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signUpInfo;
        if (!name || !email || !password) {
            return handleError('please provide correct details and full detials');
        }
        try {
            const url = `${APIUrl}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(signUpInfo)
            });
            const result = await response.json();
            const { success, message } = result;
            if (success) {
                handleSucess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }


        } catch (err) {
            handleError(err);
        }

    }


    return (
        <div className='container'>

            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='enter your name'

                    />
                </div>
                <div>

                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'

                        placeholder='enter your email' />


                </div>
                <div>
                    <label
                        htmlFor='password'>password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='enter your password' />


                </div>
                <button type='submit'>Signup</button>
                <span>Already have account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup


