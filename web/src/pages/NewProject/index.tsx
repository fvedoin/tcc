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

    useEffect(() => {
        api.get('/risks').then(() => {

        });
    }, []);

    useEffect(() => {
        api.get('/pratices').then((response) => {

        });
    }, []);

    function handleButton(e: MouseEvent) {
        e.preventDefault();
         if(step === 1) {
            setStep(step+1);
        }else if(step === 2) {
            setStep(1);
        }
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
                            <input type="text" placeholder="Name" />
                            <input type="date" placeholder="Start date" />
                            <select >
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
                            <select >
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
                            <select>
                                <option value="">Select a risk factor</option>
                                {risks.map(risk => (
                                    <option value={risk.id}>{risk.name}</option>
                                ))}
                            </select>
                            <select>
                                <option value="">Select a pratice</option>
                                <optgroup label="Firefox">
                                    {pratices.map(pratice => (
                                        <option value={pratice.id}>{pratice.name}</option>
                                    ))}
                                    <option value="">Select a pratice</option>

                                </optgroup>                           
                            </select>
                        </>
                    )}
                    
                    <button id="submit" onClick={handleButton}>{step < 2 ? 'Next' : 'Save'}</button>
                </form>
            </section>
        </div>
    );
}

export default NewProject;