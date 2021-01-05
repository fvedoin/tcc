import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import LogoutButton from '../../components/LogoutButton';

import api from '../../services/api';

import './styles.css';

function Comments() {
    const { addToast } = useToasts();
    const { id } = useParams();

    const [comment, setComment] = useState('');

    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        api.get(`relation/${id}/comments`).then(response => {
            setComments(response.data);
        });
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await api.post('comments', {
            comment, project_risk_practice_id: id
        }).then(response => {
            window.location.reload();
        }).catch(e => {
            addToast('Comment cannot be registered.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }

    return (
        <div id="page-project-practices">
            <LogoutButton />
            <h1 id="page-title">Comments</h1>
            <section className="comment-sections">
                {comments.length === 0 ? (
                    <p>No comments about it.</p>
                ) : (
                    <>
                        {comments.map(item => (
                            <div key={item.id} className="comment-group">
                                <p className="comment-date">[{new Date(item.commented_on).toDateString()}]</p>
                                <div>
                                    <p className="comment-author">{item.name}</p>
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </section>
            <section className="comment-sections">
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="form-input"
                        placeholder="Comment"
                        value={comment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)}
                    />
                    <button id="submit" type="submit">Save</button>
                </form>
            </section>
        </div>
    );
}

export default Comments;