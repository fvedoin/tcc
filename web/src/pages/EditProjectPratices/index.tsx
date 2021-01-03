import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataTable, {IDataTableColumn} from 'react-data-table-component';
import { useToasts } from 'react-toast-notifications';
import { FaComments } from 'react-icons/fa';

import { Pratices } from '../../dto/pratices';
import { Risks } from '../../dto/risks';

import api from '../../services/api';

import './styles.css';
import { report } from 'process';
import PraticesList from '../../components/PraticesList';

function EditProjectPratices() {
    const { addToast } = useToasts();
    const { id } = useParams();

    const [columns, setColumns] = useState<IDataTableColumn[]>([]);
    const [reload, setReload] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [risks, setRisks] = useState<Risks[]>([]);
    const [pratices, setPratices] = useState<Pratices[]>([]);
    const [risk_id, setRiskId] = useState('');
    const [pratice_id, setPraticeId] = useState('');
    const [report, setReport] = useState<any>();

    const [risksPratices, setRiskPratice] = useState<any[]>([]);

    useEffect(() => {
        api.get(`/projects/${id}/report`).then((response) => {
            if (!response.data.report){
                setShowForm(true);
            } else {
                setShowForm(false);
                setReport(response.data.report);
            }
        });
    }, []);

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
                            addToast('Pratice removed from the project successfully!', {
                                appearance: 'success',
                                autoDismiss: true,
                            });
                        }).catch(e => {
                            addToast('Pratice cannot be removed from the project.', {
                                appearance: 'error',
                                autoDismiss: true,
                            });
                        });
                    }}>-</button>
                },{
                    name: '',
                    selector: 'id',
                    sortable: true,
                    width: '72px',
                    format: (row, rowIndex) => <Link className="minus-button" to={`/pratices/${response.data[rowIndex].id}/comments`}><FaComments /></Link>
                }
            ]);
        });
    }, [reload]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await api.post(`projects/${id}/relation`, {
            risk_id, pratice_id
        }).then(response => {
            addToast('Pratice added to the project successfully!', {
                appearance: 'success',
                autoDismiss: true,
            });
            window.location.reload();
        }).catch(e => {
            addToast('Pratice cannot be added to the project.', {
                appearance: 'error',
                autoDismiss: true,
            });
        });
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
                {showForm ? (
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
                ) : (
                    <>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Business Impact: {report?.business_impact}</p>
                                <Link to={`/report/${report?.id}/factor/business_impact`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="business_impact" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Customer Satisfaction: {report?.customer_satisfaction}</p>
                                <Link to={`/report/${report?.id}/factor/customer_satisfaction`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="customer_satisfaction" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Goal Achievement: {report?.goal_achievement}</p>
                                <Link to={`/report/${report?.id}/factor/goal_achievement`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="goal_achievement" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Impact on Users: {report?.impact_on_users}</p>
                                <Link to={`/report/${report?.id}/factor/impact_on_users`}>Add Pratice</Link>
                            </div>                            
                            <div className="pratices-list">
                                <PraticesList successFactor="impact_on_users" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Information Quality: {report?.information_quality}</p>
                                <Link to={`/report/${report?.id}/factor/information_quality`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="information_quality" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Intention to Use: {report?.intention_to_use}</p>
                                <Link to={`/report/${report?.id}/factor/intention_to_use`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="intention_to_use" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>On Budget: {report?.on_budget}</p>
                                <Link to={`/report/${report?.id}/factor/on_budget`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="on_budget" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>On Time: {report?.on_time}</p>
                                <Link to={`/report/${report?.id}/factor/on_time`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="on_time" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Process Efficiency: {report?.process_efficiency}</p>
                                <Link to={`/report/${report?.id}/factor/process_efficiency`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="process_efficiency" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Project Management Quality: {report?.project_management_quality}</p>
                                <Link to={`/report/${report?.id}/factor/project_management_quality`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="project_management_quality" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Scope Specifications: {report?.scope_specifications}</p>
                                <Link to={`/report/${report?.id}/factor/scope_specifications`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="scope_specifications" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Stakeholder Satisfaction: {report?.stakeholder_satisfaction}</p>
                                <Link to={`/report/${report?.id}/factor/stakeholder_satisfaction`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="stakeholder_satisfaction" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>System Quality: {report?.system_quality}</p>
                                <Link to={`/report/${report?.id}/factor/system_quality`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="system_quality" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-pratices">
                            <div className="factor-header">
                                <p>Team Satisfaction: {report?.team_satisfaction}</p>
                                <Link to={`/report/${report?.id}/factor/team_satisfaction`}>Add Pratice</Link>
                            </div>
                            <div className="pratices-list">
                                <PraticesList successFactor="team_satisfaction" reportId={report?.id} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EditProjectPratices;