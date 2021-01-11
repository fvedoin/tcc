import React, { useState, useEffect, MouseEvent } from 'react';
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import { useToasts } from 'react-toast-notifications';
import LogoutButton from '../../components/LogoutButton';

import { Practices } from '../../dto/practices';
import { Risks } from '../../dto/risks';

import api from '../../services/api';

import './styles.css';

const columns: IDataTableColumn[] = [
    {
        name: 'Number of occurrences',
        selector: 'occurrence',
        sortable: true
    },
    {
        name: 'Practice',
        selector: 'name',
        sortable: true
    }
];

function SearchPratices() {
    const { addToast } = useToasts();

    const [risks, setRisks] = useState<Risks[]>([]);
    const [practices, setPractices] = useState<any[]>([]);
    
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [riskValue, setRiskValue] = useState('');

    useEffect(() => {
        api.get('/risks').then((response) => {
            setRisks(response.data.risks);
        });
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

            api.get('practices/search', {
                params: {
                    projectType: type,
                    projectDuration: duration,
                    riskId: riskValue
                }
            }).then(response => {
                setPractices(response.data.practices);
            }).catch(e => {
                addToast('Practices cannot be searched.', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            });
        
    }

    return (
        <div id="page-new-project">
            <LogoutButton />
            <h1 id="page-title">Search Pratices</h1>
            <section id="content">
                <form onSubmit={handleSubmit}> 
                    <h2>Filters</h2>
                    <select
                        className="form-input"
                        value={type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.currentTarget.value)}
                    >
                        <option value="">Select a type...</option>
                        <option value="new software development">New software development</option>
                        <option value="software enhancement">Software enhancement</option>
                        <option value="customization of commercial-off-the-shelf software">Customization of commercial-off-the-shelf software</option>
                        <option value="outsoursed software development">Outsoursed software development</option>
                        <option value="software integration">Software integration</option>
                        <option value="system migration">System migration</option>
                        <option value="enterprise-resource-planning implementation">Enterprise-resource-planning implementation</option>
                        <option value="other">Other</option>
                    </select>
                    <select
                        className="form-input"
                        value={duration}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDuration(e.currentTarget.value)}
                    >
                        <option value="">Select a duration...</option>
                        <option value="6m">6m</option>
                        <option value="6 to 12m">6 to 12m</option>
                        <option value="13 to 18m">13 to 18m</option>
                        <option value="19 to 24m">19 to 24m</option>
                        <option value="25 to 30m">25 to 30</option>
                        <option value="31 to 36m">31 to 36m</option>
                        <option value="more than 36m">more than 36m</option>
                    </select>

                    <select className="form-input" onChange={e => setRiskValue(e.target.value)}>
                        <option value="">Select a risk factor</option>
                        {risks.map(risk => (
                            <option key={risk.id} value={risk.id}>{risk.name}</option>
                        ))}
                    </select>
                    <button id="submit" type="submit">Search</button>
                </form>
            </section>
            <br/>
            <br/>
            <div className="content">
                <DataTable
                    title="Found practices"
                    columns={columns}
                    data={practices}
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
            <br/>
            <br/>    
        </div>
    );
}

export default SearchPratices;