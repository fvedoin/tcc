import React, { useState, useEffect, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import DataTable, {IDataTableColumn} from 'react-data-table-component';

import { Pratices } from '../../dto/pratices';
import { Risks } from '../../dto/risks';

import api from '../../services/api';

import './styles.css';

function EditProjectPratices() {
    const { id } = useParams();

    const [columns, setColumns] = useState<IDataTableColumn[]>([]);
    const [risks, setRisks] = useState<Risks[]>([]);
    const [pratices, setPratices] = useState<Pratices[]>([]);

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
                  sortable: true
                },
                {
                  name: 'Removed On',
                  selector: 'removed_on',
                  sortable: true,
                  wrap: true
                },{
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <button style={{
                        height: 24,
                        width: 24
                    }} onClick={() => {
                        api.put(`/relation/${response.data[rowIndex].id}`).then(response => {
                            risksPratices[rowIndex].removed_on = new Date();
                        });
                    }}>-</button>
                },
            ]);
        });
    }, []);

    return (
        <div id="page-new-project">
            <h1 id="page-title">Risk Factors and Pratices</h1>
            <div className="content">
                <DataTable
                        title="Projects"
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
        </div>
    );
}

export default EditProjectPratices;