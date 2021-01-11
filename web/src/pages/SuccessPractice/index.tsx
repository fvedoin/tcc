import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

function SuccessPractice() {
    const { addToast } = useToasts();
    const { id, projectId, successFactor } = useParams();

    const [practices, setPractices] = useState<any[]>([]);
    const [practice_id, setPracticeId] = useState('');

    useEffect(() => {
        api.get(`/projects/${projectId}/practices`).then((response) => {
            setPractices(response.data.practices);
        }).catch(e => {
            addToast('Practices cannot be fetched.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        api.post('final-report/practices', {
            practice_id,
            success_factor: successFactor,
            report_id: id
        }).then(response => {
            addToast('Practice added to the success factor successfully!', {
                appearance: 'success',
                autoDismiss: true,
            });
        }).catch(e => {
            addToast('Practice cannot be added to the success factor.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }

    return (
        <div id="page-list-project">
            <h1 id="page-title">Add Practice</h1>
            <div id="content">
                <h2>Select one of the practices that<br/>were used in the project</h2>
                <form onSubmit={handleSubmit}>
                    <select className="form-input" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPracticeId(e.currentTarget.value)}>
                        <option value="">Select a practice</option>
                        {practices.map(practice => (
                            <option key={practice.practice_id} value={practice.practice_id}>{practice.name.charAt(0).toUpperCase() + practice.name.slice(1)}</option>
                        ))}               
                    </select>
                    <button type="submit" id="submit">Add</button>
                </form>
            </div>            
        </div>
    );
}

export default SuccessPractice;