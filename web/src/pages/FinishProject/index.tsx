import React, { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function FinishProject() {
    const [step, setStep] = useState(1);
    const [scope_specifications, setScopeSpecificatoins] = useState(50);
    const [process_efficiency, setProcessEfficiency] = useState(50);
    const [goal_achievement, setGoalAchievement] = useState(50);
    const [project_management_quality, setQualityProjectManagement] = useState(50);
    const [stakeholder_satisfaction, setStakeholderSatisfaction] = useState(50);
    const [team_satisfaction, setTeamSatisfaction] = useState(50);
    
    const [customer_satisfaction, setUserCustomerSatisfaction] = useState(50);
    const [intention_to_use, setIntentionToUse] = useState(50);
    const [system_quality, setSystemQuality] = useState(50);
    const [information_quality, setInformationQuality] = useState(50);
    const [business_impact, setBusinessImpact] = useState(50);
    const [impact_on_users, setImpactOnUsers] = useState(50);
    const [on_budget, setOnBudget] = useState(50);
    const [on_time, setOnTime] = useState(50);

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
            api.post('finish-project', body).then((response) => {
                console.log(response);
            });
            setStep(1);
        }
    }

    return (
        <div id="page-new-project">
            <h1 id="page-title">New Project</h1>
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
                            <label>Scope/Specification</label>
                            <input className="slider" type="range" min={0} max={100} value={scope_specifications} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScopeSpecificatoins(Number(e.currentTarget.value))} />

                            <label>Process efficiency</label>
                            <input className="slider" type="range" min={0} max={100} value={process_efficiency} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProcessEfficiency(Number(e.currentTarget.value))} />

                            <label>Goal achievement</label>
                            <input className="slider" type="range" min={0} max={100} value={goal_achievement} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoalAchievement(Number(e.currentTarget.value))} />

                            <label>Quality of project management</label>
                            <input className="slider" type="range" min={0} max={100} value={project_management_quality} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQualityProjectManagement(Number(e.currentTarget.value))} />

                            <label>Project Stakeholder Satisfaction</label>
                            <input className="slider" type="range" min={0} max={100} value={stakeholder_satisfaction} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStakeholderSatisfaction(Number(e.currentTarget.value))} />


                            <label>Team is satisfied</label>
                            <input className="slider" type="range" min={0} max={100} value={team_satisfaction} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamSatisfaction(Number(e.currentTarget.value))} />
                        </>
                    ) : (step === 2) ? (
                        <>
                            <h2>User Satisfaction</h2>
                            <label>User/Customer satisfaction</label>
                            <input className="slider" type="range" min={0} max={100} value={customer_satisfaction} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserCustomerSatisfaction(Number(e.currentTarget.value))} />

                            <label>Intention to use</label>
                            <input className="slider" type="range" min={0} max={100} value={intention_to_use} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIntentionToUse(Number(e.currentTarget.value))} />
                           
                            <h2>Time & Budget</h2>
                            <label>On budget</label>
                            <input className="slider" type="range" min={0} max={100} value={on_budget} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnBudget(Number(e.currentTarget.value))} />

                            <label>On time</label>
                            <input className="slider" type="range" min={0} max={100} value={on_time} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnTime(Number(e.currentTarget.value))} />
                           
                        </>
                    ) : (
                        <>
                            <h2>System quality</h2>
                            <label>System quality</label>
                            <input className="slider" type="range" min={0} max={100} value={system_quality} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSystemQuality(Number(e.currentTarget.value))} />

                            <label>Information quality</label>
                            <input className="slider" type="range" min={0} max={100} value={information_quality} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInformationQuality(Number(e.currentTarget.value))} />
                           
                            <h2>Economic value</h2>
                            <label>Business impact</label>
                            <input className="slider" type="range" min={0} max={100} value={business_impact} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessImpact(Number(e.currentTarget.value))} />

                            <label>Impact on users</label>
                            <input className="slider" type="range" min={0} max={100} value={impact_on_users} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImpactOnUsers(Number(e.currentTarget.value))} />
                           
                        </>
                    )}
                    
                    <button id="submit" onClick={handleButton}>{step < 3 ? 'Next' : 'Save'}</button>
                </form>
            </section>
        </div>
    );
}

export default FinishProject;