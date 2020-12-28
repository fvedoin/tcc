import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import './styles.css';

function NewUser() {
    const { addToast } = useToasts();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        api.post('users', {
            name,
            email,
            password,
            profile
        }).then(response => {
            addToast('User registered successfully!', {
                appearance: 'success',
                autoDismiss: true,
            });
        }).catch(e => {
            addToast('User cannot be registered.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }

    return (
        <div id="page-new-user">
            <h1 id="page-title">New User</h1>
            <section id="content">
                <form onSubmit={handleSubmit}>
                    <h2>General Infos</h2>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Profile"
                        value={profile}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(e.currentTarget.value)}
                    />
                    <button id="submit" type="submit">Save</button>
                </form>
            </section>
        </div>
    );
}

export default NewUser;