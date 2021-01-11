import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import PracticesList from '../../components/PracticesList';
import LogoutButton from '../../components/LogoutButton';

function ProjectSuccessFactor() {
    const { addToast } = useToasts();
    const { id } = useParams();

    const [report, setReport] = useState<any>();

    useEffect(() => {
        api.get(`/projects/${id}/report`).then((response) => {
            setReport(response.data.report);
        });
    }, []);

    return (
        <div id="page-project-practices">
            <LogoutButton />
            <h1 id="page-title">Final report</h1>
            <div className="content">
            </div>
            <div id="content-below">
                          <div className="factor-practices">
                            <div className="factor-header">
                                <p>Business Impact: {report?.business_impact}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/business_impact`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="business_impact" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Customer Satisfaction: {report?.customer_satisfaction}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/customer_satisfaction`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="customer_satisfaction" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Goal Achievement: {report?.goal_achievement}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/goal_achievement`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="goal_achievement" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Impact on Users: {report?.impact_on_users}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/impact_on_users`}>Add Practice</Link>
                            </div>                            
                            <div className="practices-list">
                                <PracticesList successFactor="impact_on_users" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Information Quality: {report?.information_quality}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/information_quality`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="information_quality" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Intention to Use: {report?.intention_to_use}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/intention_to_use`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="intention_to_use" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>On Budget: {report?.on_budget}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/on_budget`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="on_budget" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>On Time: {report?.on_time}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/on_time`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="on_time" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Process Efficiency: {report?.process_efficiency}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/process_efficiency`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="process_efficiency" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Project Management Quality: {report?.project_management_quality}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/project_management_quality`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="project_management_quality" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Scope Specifications: {report?.scope_specifications}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/scope_specifications`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="scope_specifications" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Stakeholder Satisfaction: {report?.stakeholder_satisfaction}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/stakeholder_satisfaction`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="stakeholder_satisfaction" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>System Quality: {report?.system_quality}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/system_quality`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="system_quality" reportId={report?.id} />
                            </div>
                        </div>
                        <div className="factor-practices">
                            <div className="factor-header">
                                <p>Team Satisfaction: {report?.team_satisfaction}</p>
                                <Link to={`/report/${report?.id}/project/${id}/factor/team_satisfaction`}>Add Practice</Link>
                            </div>
                            <div className="practices-list">
                                <PracticesList successFactor="team_satisfaction" reportId={report?.id} />
                            </div>
                        </div>
            </div>
        </div>
    );
}

export default ProjectSuccessFactor;