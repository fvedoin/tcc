import React, { useState, useEffect, MouseEvent } from 'react';
import { useToasts } from 'react-toast-notifications';
import LogoutButton from '../../components/LogoutButton';

import { Practices } from '../../dto/practices';
import { Risks } from '../../dto/risks';

import api from '../../services/api';

import './styles.css';

function NewProject() {
    const { addToast } = useToasts();

    const [step, setStep] = useState(1);
    const [risks, setRisks] = useState<Risks[]>([]);
    const [practices, setPractices] = useState<Practices[]>([]);
    
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [start_date, setStartDate] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [risksPractices, setRiskPractice] = useState([
        {risk_id: 0, practice_id: 0}
    ]);

    useEffect(() => {
        api.get('/risks').then((response) => {
            setRisks(response.data.risks);
        });
    }, []);

    useEffect(() => {
        api.get('/practices').then((response) => {
            setPractices(response.data.practices);
        });
    }, []);

    function handleButton(e: MouseEvent) {
        e.preventDefault();
         if(step === 1) {
            setStep(step+1);
        }else if(step === 2) {
            api.post('projects', {
                name,
                start_date,
                type,
                duration,
                risksPractices,
                users: team.trim().split(',')
            }).then(response => {
                addToast('Project registered successfully!', {
                    appearance: 'success',
                    autoDismiss: true,
                });
            }).catch(e => {
                addToast('Project cannot be registered.', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            });
        }
    }

    function setRiskPracticeItemValue(position: number, field: string, value: string) {
        if(field === 'risk_id') {
            const risk = risks.filter(item => {
                return item.id === Number(value);
            });
            api.get(`/risks/${value}/practices`).then(response => {
                if(response.data.practices.length > 0){
                    var usedPractices = '';
                    response.data.practices.map((item: any, index: number) => {
                        if(index !== response.data.practices.length-1){
                            usedPractices += `(${index+1}º) ${item.name}, `;
                        } else {
                            usedPractices += `(${index+1}º) ${item.name}.`;
                        }                    
                    });
                    addToast(`Used practices for ${risk[0].name}: ${usedPractices}`, {
                        appearance: 'info',
                        autoDismiss: false,
                    });
                }                
            }).catch(e => {
                addToast('Practices cannot be loaded.', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            });
        }

        const updatedScheduleItems = risksPractices.map((scheduleItem, index) => {
            if(index === position) {
                return {...scheduleItem, [field]: value};
            }
            return scheduleItem;
        });

        setRiskPractice(updatedScheduleItems);
    }

    function addNewRiskPractice() {
        setRiskPractice([
            ...risksPractices,
            { risk_id: 0, practice_id: 0}
        ]);
    }

    return (
        <div id="page-new-project">
            <LogoutButton />
            <h1 id="page-title">New Project</h1>
            <section id="content">
                <div id="steps">
                    <p className={step >= 1 ? 'step-item step-item-active' : 'step-item'}>1</p>
                    <div className={step >= 2 ? 'connector connector-active' : 'connector'}></div>
                    <p className={step >= 2 ? 'step-item step-item-active' : 'step-item'}>2</p>
                </div>
                <form>
                    {step === 1 ? (
                        <>
                            <h2>General Infos</h2>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                            />
                            <input
                                className="form-input"
                                type="date"
                                placeholder="Start date"
                                value={start_date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.currentTarget.value)}
                            />
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
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Team"
                                value={team}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeam(e.currentTarget.value)}
                            />
                        </>
                    ) : (
                        <>
                        {risksPractices.map((item, index) => {
                            return(
                                <div className="select-group" key={index.toString()}>
                                    <select className="first-select form-input" onChange={e => setRiskPracticeItemValue(index, 'risk_id', e.target.value)}>
                                        <option value="">Select a risk factor</option>
                                        {risks.map(risk => (
                                            <option key={risk.id} value={risk.id}>{risk.name}</option>
                                        ))}
                                    </select>
                                    <select className="form-input" onChange={e => setRiskPracticeItemValue(index, 'practice_id', e.target.value)}>
                                        <option value="">Select a practice</option>
                                        <optgroup label="Firefox">
                                            {practices.map(practice => (
                                                <option key={practice.id} value={practice.id}>{practice.name.charAt(0).toUpperCase() + practice.name.slice(1)}</option>
                                            ))}
                                            <option value="">Select a practice</option>
                                        </optgroup>                   
                                    </select>
                                </div>
                            );
                        })}
                            
                            <button type="button" id="add-button" onClick={addNewRiskPractice}>+</button>
                        </>
                    )}
                    
                    <button id="submit" onClick={handleButton}>{step < 2 ? 'Next' : 'Save'}</button>
                </form>
            </section>
        </div>
    );
}

export default NewProject;