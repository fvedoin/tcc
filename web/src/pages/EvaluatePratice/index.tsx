import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import LogoutButton from '../../components/LogoutButton';

import api from '../../services/api';

import './styles.css';

function EvaluatePratice() {
    const { addToast } = useToasts();
    const { id } = useParams();

    const [grade, setGrade] = useState(0);

    useEffect(() => {
        api.get(`relation/${id}`).then(response => {
            if (response.data)
                setGrade(response.data.grade);
        });
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await api.put(`relation/${id}/grade`, {
            grade
        }).then(response => {
            addToast('Grade registered successfully.', {
                appearance: 'success',
                autoDismiss: true,
            });
        }).catch(e => {
            addToast('Grade cannot be registered.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }

    return (
        <div id="page-project-practices">
            <LogoutButton />
            <h1 id="page-title">Evaluate Pratice</h1>
            <div id="content" >
                <h2>Rate the practice according to its performance</h2>
                <form onSubmit={handleSubmit}>
                    <label>Pratice grade: {grade}</label>
                    <input className="slider" type="range" min={0} max={10} value={grade} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrade(Number(e.currentTarget.value))} />
                    <button type="submit" id="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default EvaluatePratice;