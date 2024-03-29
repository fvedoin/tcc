import React, { useState, useEffect } from 'react';
import DataTable, {IDataTableColumn} from 'react-data-table-component';
import { FaPlus, FaSitemap, FaStop, FaUsers } from 'react-icons/fa';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import LogoutButton from '../../components/LogoutButton';

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
                  name: 'Name',
                  selector: 'name',
                  sortable: true
                },
                {
                    name: 'Start date',
                    selector: 'start_date',
                    sortable: true,
                    format: (row, rowIndex) => new Date(response.data[rowIndex].start_date).toDateString()
                },
                {
                    name: 'End date',
                    selector: 'end_date',
                    sortable: true,
                    format: (row, rowIndex) => response.data[rowIndex].end_date && new Date(response.data[rowIndex].end_date).toDateString()
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
                },
                {
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <Link className="minus-button" to={`/project/${response.data[rowIndex].id}/practices`}><FaSitemap /></Link> 
                },
                {
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => response.data[rowIndex].end_date ? (<button className="minus-button" disabled><FaStop size="14" /></button>) : (<Link className="minus-button" to={`/project/${response.data[rowIndex].id}/finish`}><FaStop /></Link>)
                },
                {
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <Link className="minus-button" to={`/project/${response.data[rowIndex].id}/users`}><FaUsers /></Link> 
                }
                ,
                {
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <Link className="minus-button" to={`/project/${response.data[rowIndex].id}/report`}><IoCheckmarkDoneOutline /></Link> 
                }
            ]);
        });
    }, []);   

    return (
        <div id="page-list-project">
            <LogoutButton />
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
            <Link className="add-button" to="/new/project"><FaPlus size="24" /></Link>
        </div>
    );
}

export default ListProject;