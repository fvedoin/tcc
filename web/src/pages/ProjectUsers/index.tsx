import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable, {IDataTableColumn} from 'react-data-table-component';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import LogoutButton from '../../components/LogoutButton';

function ProjectUsers() {
    const { addToast } = useToasts();
    const { id } = useParams();

    const [columns, setColumns] = useState<IDataTableColumn[]>([]);
 
    const [members, setMembers] = useState('');
    const [reload, setReload] = useState(false);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        api.get(`projects/${id}/users`).then(response => {
            setUsers(response.data.users);
            setColumns([
                {
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px'
                },
                {
                  name: 'Name',
                  selector: 'name',
                  sortable: true
                },
                {
                  name: 'Email',
                  selector: 'email',
                  sortable: true
                },
                {
                  name: 'Role',
                  selector: 'profile',
                  sortable: true
                }
            ]);
        }).catch(e =>{
            addToast('Users cannot be fetched.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }, [reload]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await api.put(`projects/${id}/members`, {
            members: members.trim().split(',')
        }).then(response => {
            addToast('Member(s) added to the project successfully!', {
                appearance: 'success',
                autoDismiss: true,
            });
            setReload(!reload);
        }).catch(e => {
            addToast('Member(s) cannot be added to the project.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    }

    return (
        <div id="page-project-practices">
            <LogoutButton />
            <h1 id="page-title">Project details</h1>
            <div className="content">
                <DataTable
                        title="Project users"
                        columns={columns}
                        data={users}
                        responsive={true}
                        pagination={true}
                        style={{
                            width: 1000,
                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'
                        }}
                        customStyles={{
                            header: {
                                style: {
                                    color: '#00334E',
                                    fontFamily: 'Roboto'
                                }
                            },
                            headCells: {
                                style: {
                                    color: '#145374',
                                    fontFamily: 'Roboto'
                                }
                            },
                            cells: {
                                style: {
                                    color: '#145374',
                                    fontFamily: 'Roboto',
                                    opacity: 0.5
                                }
                            },
                            pagination: {
                                style: {
                                    color: '#145374',
                                    fontFamily: 'Roboto',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                }
                            }
                        }}
                    />
            </div>
            <div id="content-below">
                <form onSubmit={handleSubmit}>
                    <input
                            className="form-input"
                            type="text"
                            placeholder="Team"
                            value={members}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMembers(e.currentTarget.value)}
                        />
                    <button id="submit" type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default ProjectUsers;