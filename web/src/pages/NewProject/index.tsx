import React, { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { Pratices } from '../../dto/pratices';
import { Risks } from '../../dto/risks';

import api from '../../services/api';

import './styles.css';

function NewProject() {
    const [step, setStep] = useState(1);
    const [risks, setRisks] = useState<Risks[]>([]);
    const [pratices, setPratices] = useState<Pratices[]>([]);
    
    const [name, setName] = useState('');
    const [start_date, setStartDate] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [risksPratices, setRiskPratice] = useState([
        {risk_id: 0, pratice_id: 0}
    ]);

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
                risksPratices
            }).then(response => {
                console.log(response);
            });
        }
    }

    function setRiskPraticeItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = risksPratices.map((scheduleItem, index) => {
            if(index === position) {
                return {...scheduleItem, [field]: value};
            }
            return scheduleItem;
        });

        setRiskPratice(updatedScheduleItems);
    }

    function addNewRiskPratice() {
        setRiskPratice([
            ...risksPratices,
            { risk_id: 0, pratice_id: 0}
        ]);
    }

    return (
        <div id="page-new-project">
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
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                            />
                            <input
                                type="date"
                                placeholder="Start date"
                                value={start_date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.currentTarget.value)}
                            />
                            <select
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
                        </>
                    ) : (
                        <>
                        {risksPratices.map((item, index) => {
                            return(
                                <div className="select-group" key={index.toString()}>
                                    <select className="first-select" onChange={e => setRiskPraticeItemValue(index, 'risk_id', e.target.value)}>
                                        <option value="">Select a risk factor</option>
                                        {risks.map(risk => (
                                            <option value={risk.id}>{risk.name}</option>
                                        ))}
                                    </select>
                                    <select onChange={e => setRiskPraticeItemValue(index, 'pratice_id', e.target.value)}>
                                        <option value="">Select a pratice</option>
                                        <optgroup label="Firefox">
                                            {pratices.map(pratice => (
                                                <option value={pratice.id}>{pratice.name.charAt(0).toUpperCase() + pratice.name.slice(1)}</option>
                                            ))}
                                            <option value="">Select a pratice</option>
                                        </optgroup>                   
                                    </select>
                                </div>
                            );
                        })}
                            
                            <button type="button" id="add-button" onClick={addNewRiskPratice}>+</button>
                        </>
                    )}
                    
                    <button id="submit" onClick={handleButton}>{step < 2 ? 'Next' : 'Save'}</button>
                </form>
            </section>
        </div>
    );
}

export default NewProject;