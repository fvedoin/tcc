import React, { useState, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import './styles.css';

function FinishProject() {
    const { id } = useParams();
    const { addToast } = useToasts();

    const [step, setStep] = useState(1);
    const [scope_specifications, setScopeSpecificatoins] = useState(5);
    const [process_efficiency, setProcessEfficiency] = useState(5);
    const [goal_achievement, setGoalAchievement] = useState(5);
    const [project_management_quality, setQualityProjectManagement] = useState(5);
    const [stakeholder_satisfaction, setStakeholderSatisfaction] = useState(5);
    const [team_satisfaction, setTeamSatisfaction] = useState(5);
    
    const [customer_satisfaction, setUserCustomerSatisfaction] = useState(5);
    const [intention_to_use, setIntentionToUse] = useState(5);
    const [system_quality, setSystemQuality] = useState(5);
    const [information_quality, setInformationQuality] = useState(5);
    const [business_impact, setBusinessImpact] = useState(5);
    const [impact_on_users, setImpactOnUsers] = useState(5);
    const [on_budget, setOnBudget] = useState(5);
    const [on_time, setOnTime] = useState(5);

    function handleButton(e: MouseEvent) {
        e.preventDefault();
         if(step === 1 || step === 2) {
            setStep(step+1);
        }else if(step === 3) {
            const body = {
                scope_specifications,
                process_efficiency,
                goal_achievement,
                project_management_quality,
                stakeholder_satisfaction,
                team_satisfaction,
                customer_satisfaction,
                intention_to_use,
                system_quality,
                information_quality,
                business_impact,
                impact_on_users,
                on_budget,
                on_time
            };

            api.post(`projects/${id}/finish`, body).then((response) => {
                addToast('Project finished successfully!', {
                    appearance: 'success',
                    autoDismiss: true,
                });
            }).catch(e => {
                addToast('Project cannot be finished.', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            });
            setStep(1);
        }
    }

    return (
        <div id="page-new-project">
            <h1 id="page-title">Finish Project</h1>
            <section id="content">
                <div id="steps">
                    <button className={step >= 1 ? 'step-item step-item-active' : 'step-item'} onClick={() => {(step > 1 && setStep(1))}}>1</button>
                    <div className={step >= 2 ? 'connector connector-active' : 'connector'}></div>
                    <button className={step >= 2 ? 'step-item step-item-active' : 'step-item'} onClick={() => {(step > 2 && setStep(2))}}>2</button>
                    <div className={step >= 3 ? 'connector connector-active' : 'connector'}></div>
                    <button className={step >= 3 ? 'step-item step-item-active' : 'step-item'}>3</button>
                </div>
                <form>
                    {step === 1 ? (
                        <>
                            <h2>Project Management</h2>
                            <label>Scope/Specification: {scope_specifications}</label>
                            <input className="slider" type="range" min={0} max={10} value={scope_specifications} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScopeSpecificatoins(Number(e.currentTarget.value))} />

                            <label>Process efficiency: {process_efficiency}</label>
                            <input className="slider" type="range" min={0} max={10} value={process_efficiency} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProcessEfficiency(Number(e.currentTarget.value))} />

                            <label>Goal achievement: {goal_achievement}</label>
                            <input className="slider" type="range" min={0} max={10} value={goal_achievement} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoalAchievement(Number(e.currentTarget.value))} />

                            <label>Quality of project management: {project_management_quality}</label>
                            <input className="slider" type="range" min={0} max={10} value={project_management_quality} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQualityProjectManagement(Number(e.currentTarget.value))} />

                            <label>Project Stakeholder Satisfaction: {stakeholder_satisfaction}</label>
                            <input className="slider" type="range" min={0} max={10} value={stakeholder_satisfaction} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStakeholderSatisfaction(Number(e.currentTarget.value))} />

                            <label>Team is satisfied: {team_satisfaction}</label>
                            <input className="slider" type="range" min={0} max={10} value={team_satisfaction} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamSatisfaction(Number(e.currentTarget.value))} />
                        </>
                    ) : (step === 2) ? (
                        <>
                            <h2>User Satisfaction</h2>
                            <label>User/Customer satisfaction: {customer_satisfaction}</label>
                            <input className="slider" type="range" min={0} max={10} value={customer_satisfaction} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserCustomerSatisfaction(Number(e.currentTarget.value))} />

                            <label>Intention to use: {intention_to_use}</label>
                            <input className="slider" type="range" min={0} max={10} value={intention_to_use} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIntentionToUse(Number(e.currentTarget.value))} />
                           
                            <h2>Time & Budget</h2>
                            <label>On budget: {on_budget}</label>
                            <input className="slider" type="range" min={0} max={10} value={on_budget} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnBudget(Number(e.currentTarget.value))} />

                            <label>On time: {on_time}</label>
                            <input className="slider" type="range" min={0} max={10} value={on_time} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnTime(Number(e.currentTarget.value))} />
                           
                        </>
                    ) : (
                        <>
                            <h2>System quality</h2>
                            <label>System quality: {system_quality}</label>
                            <input className="slider" type="range" min={0} max={10} value={system_quality} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSystemQuality(Number(e.currentTarget.value))} />

                            <label>Information quality: {information_quality}</label>
                            <input className="slider" type="range" min={0} max={10} value={information_quality} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInformationQuality(Number(e.currentTarget.value))} />
                           
                            <h2>Economic value</h2>
                            <label>Business impact: {business_impact}</label>
                            <input className="slider" type="range" min={0} max={10} value={business_impact} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessImpact(Number(e.currentTarget.value))} />

                            <label>Impact on users: {impact_on_users}</label>
                            <input className="slider" type="range" min={0} max={10} value={impact_on_users} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImpactOnUsers(Number(e.currentTarget.value))} />
                           
                        </>
                    )}
                    
                    <button id="submit" onClick={handleButton}>{step < 3 ? 'Next' : 'Save'}</button>
                </form>
            </section>
        </div>
    );
}

export default FinishProject;