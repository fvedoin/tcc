import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Login() {
    return (
        <div id="page-login">
            <section id="sign-up">
                <div>
                    <h1 id="hello-visitor">Hello, visitor!</h1>
                    <p>Enter your details and start the journey!</p>
                </div>
                <button id="sign-up-button">Sign Up</button>   
            </section>            
            <section id="sign-in">
                <h1 id="sign-in-title">Sign In</h1>
                <input placeholder="Username" id="input-user" />
                <input placeholder="Password" id="input-password" />
                <button id="sign-in-button">Sign In</button>
            </section>            
        </div>
    );
}

export default Login;