import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Pratices } from '../../dto/pratices';

import api from '../../services/api';

function SuccessPratice() {
    const [projects, setProjects] = useState<any[]>([]);
    const { id, successFactor } = useParams();

    const [pratices, setPratices] = useState<Pratices[]>([]);
    const [pratice_id, setPraticeId] = useState('');

    useEffect(() => {
        api.get('/pratices').then((response) => {
            setPratices(response.data.pratices);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        api.post('final-report/pratices', {
            pratice_id,
            success_factor: successFactor,
            report_id: id
        }).then(response => {
            console.log(response)
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div id="page-list-project">
            <h1 id="page-title">Add Pratice</h1>
            <div id="content">
                <form onSubmit={handleSubmit}>
                    <select className="form-input" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPraticeId(e.currentTarget.value)}>
                        <option value="">Select a pratice</option>
                        {pratices.map(pratice => (
                            <option key={pratice.id} value={pratice.id}>{pratice.name.charAt(0).toUpperCase() + pratice.name.slice(1)}</option>
                        ))}
                        <option value="">Select a pratice</option>                  
                    </select>
                    <button type="submit" id="submit">Add</button>
                </form>
            </div>            
        </div>
    );
}

export default SuccessPratice;