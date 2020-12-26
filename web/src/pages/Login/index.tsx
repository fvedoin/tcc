import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import {login} from '../../auth/auth';
import api from '../../services/api';

import './styles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        api.post('login', {email, password}).then(response => {
            login(response.data.token, response.data.currentUser);
            history.push('/list/project');
        }).catch(e => {
            console.log(e);
        })

    }
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
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        placeholder="Email"
                        id="input-user"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                    />
                    <input
                        className="form-input"
                        placeholder="Password"
                        id="input-password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    />
                    <button type="submit" id="sign-in-button">Sign In</button>
                </form>
            </section>            
        </div>
    );
}

export default Login;