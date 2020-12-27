import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

function Comments() {
    const { id } = useParams();

    const [comment, setComment] = useState('');

    const [comments, setComments] = useState<any[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await api.post(`comments`, {
            comment, project_risk_pratice_id: id
        }).then(response => {
            window.location.reload();
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div id="page-project-pratices">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="form-input"
                    placeholder="Comment"
                    value={comment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)}
                />
                <button id="submit" type="submit">Save</button>
            </form>
        </div>
    );
}

export default Comments;