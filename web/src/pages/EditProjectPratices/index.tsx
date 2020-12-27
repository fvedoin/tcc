import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataTable, {IDataTableColumn} from 'react-data-table-component';

import { Pratices } from '../../dto/pratices';
import { Risks } from '../../dto/risks';

import api from '../../services/api';

import './styles.css';

function EditProjectPratices() {
    const { id } = useParams();

    const [columns, setColumns] = useState<IDataTableColumn[]>([]);
    const [reload, setReload] = useState(false);
    const [risks, setRisks] = useState<Risks[]>([]);
    const [pratices, setPratices] = useState<Pratices[]>([]);
    const [risk_id, setRiskId] = useState('');
    const [pratice_id, setPraticeId] = useState('');

    const [risksPratices, setRiskPratice] = useState<any[]>([]);

    useEffect(() => {
        api.get('/risks').then((response) => {
            setRisks(response.data.risks);
        });
    }, []);

    useEffect(() => {
        api.get('/pratices').then((response) => {
            setPratices(response.data.pratices);
        });
    }, []);

    useEffect(() => {
        api.get(`/projects/${id}/relation`).then((response) => {
            setRiskPratice(response.data);
            setColumns([
                {
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <>{response.data[rowIndex].id}</>
                },
                {
                  name: 'Risk Factor',
                  selector: 'risk',
                  sortable: true
                },
                {
                    name: 'Pratice',
                    selector: 'pratice',
                    sortable: true
                },
                {
                  name: 'Added On',
                  selector: 'added_on',
                  sortable: true,
                  format: (row, rowIndex) => <>{new Date(response.data[rowIndex].added_on).toDateString()}</>
                },
                {
                  name: 'Removed On',
                  selector: 'removed_on',
                  sortable: true,
                  wrap: true,
                  format: (row, rowIndex) => <>{response.data[rowIndex].removed_on && (new Date(response.data[rowIndex].removed_on).toDateString())}</>
                },{
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <button className="minus-button"
                    disabled={response.data[rowIndex].removed_on ? true : false}
                    onClick={() => {
                        api.put(`/relation/${response.data[rowIndex].id}/remove`).then(response => {
                            setReload(!reload);
                        });
                    }}>-</button>
                },{
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <Link to={`/pratices/${response.data[rowIndex].id}/comments`}>go</Link>
                }
            ]);
        });
    }, [reload]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await api.post(`projects/${id}/relation`, {
            risk_id, pratice_id
        }).then(response => {
            window.location.reload();
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div id="page-project-pratices">
            <h1 id="page-title">Project details</h1>
            <div className="content">
                <DataTable
                        title="Risk Factors and Pratices"
                        columns={columns}
                        data={risksPratices}
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
            <div className="select-group">
                <form onSubmit={handleSubmit}>
                    <select className="first-select form-input" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRiskId(e.currentTarget.value)}>
                        <option value="">Select a risk factor</option>
                        {risks.map(risk => (
                            <option key={risk.id} value={risk.id}>{risk.name}</option>
                        ))}
                    </select>
                    <select className="form-input" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPraticeId(e.currentTarget.value)}>
                        <option value="">Select a pratice</option>
                        {pratices.map(pratice => (
                            <option key={pratice.id} value={pratice.id}>{pratice.name.charAt(0).toUpperCase() + pratice.name.slice(1)}</option>
                        ))}
                        <option value="">Select a pratice</option>                  
                    </select>
                    <button id="submit" type="submit">Add</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default EditProjectPratices;