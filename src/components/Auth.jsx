import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg';
//import { isAudioAttachment } from 'stream-chat-react';
//import { login } from '../../../server/controllers/auth.jsx';

const cookies = new Cookies();

const initialState={
    fullName: '',
    usern9ame: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {

    const [form, setForm] =  useState(initialState)
    const [isSignUp, setIsSignUp] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
        
    
    }
    const switchMode=()=>{
        //setIsSignUp(!isSignUp)
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    }

    //cookies

    const handleSubmit= async (e)=>{
        e.preventDefault();
        //console.log(form)
        const { fullname, username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignUp ? `signup` : `login`}`, {
            username, password, phoneNumber, avatarURL,
        });
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignUp){
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();                    //reload browser
    }

    //fill in the inputs then go into the handlesubmit function and get all the data from the form through the
    //const { fullname, username, password, phoneNumber, avatarURL } = form function
    //get the URL through the  const URL = 'http://localhost:5000/auth';
    // make the request to the backend through the const { data:... on line 43 making the request on a different url depending on wether its signup or login
    //then pass the data and get it from the backend and store evrything into cookies through the cookies.set
    //then we reload the application using the window.location.reload();
    // we are reloading the application so that in th App.js, we reload without hitting the Auth again, it should take us to the application instead of taking us through authentication


    return ( 
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName"> Full Name</label>
                                <input 
                                    name="fullName"
                                    type="text"
                                    placeholder="full Name"
                                    onChange={handleChange}
                                    required/>
                            </div>

                        )}
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="username"> Username</label>
                                <input 
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required/>
                            </div>
                            {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber"> Phone Number</label>
                                <input 
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required/>
                            </div>
                        )}
                        
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL"> Avatar URL</label>
                                <input 
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required/>
                            </div>

                        )}

                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required/>
                            </div>
                            {isSignUp && (
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="password">Confirm Password</label>
                                    <input 
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={handleChange}
                                        required/>
                                </div>    
                                    )}
                                <div className="auth__form-container_fields-content_button">
                                    <button>{isSignUp ? "Sign Up": "Sign In"}</button>
                                </div>
                    </form> 
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignUp
                                ? "Already have an account? "
                                : "Dont have an account? "            
                            }
                            <span onClick={switchMode}>
                                {isSignUp? 'Sign In' : "Sign Up"}
                            </span>
                        </p>
                    </div>       
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="" />
            </div>
            
        </div>
    )
}

export default Auth;
