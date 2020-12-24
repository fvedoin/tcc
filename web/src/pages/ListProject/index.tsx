import React, { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import DataTable, {IDataTableColumn} from 'react-data-table-component';
import api from '../../services/api';

import './styles.css';

function ListProject() {
    const [columns, setColumns] = useState<IDataTableColumn[]>([]);
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
            setColumns([
                {
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <>{response.data[rowIndex].id}</>
                },
                {
                  name: 'Name',
                  selector: 'name',
                  sortable: true
                },
                {
                    name: 'Start date',
                    selector: 'start_date',
                    sortable: true
                },
                {
                  name: 'Duration',
                  selector: 'duration',
                  sortable: true
                },
                {
                  name: 'Type',
                  selector: 'type',
                  sortable: true,
                  wrap: true 
                }
            ]);
        });
    }, []);

    return (
        <div id="page-list-project">
            <h1 id="page-title">Project List</h1>
            <div className="content">
                <DataTable
                    title="Projects"
                    columns={columns}
                    data={projects}
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

export default ListProject;