import React, { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function FinishProject() {
    const [step, setStep] = useState(1);
    const [scopeSpecificatoins, setScopeSpecificatoins] = useState('');

    useEffect(() => {
        console.log(scopeSpecificatoins);
    }, [scopeSpecificatoins]);

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
                    <div className={step >= 3 ? 'connector connector-active' : 'connector'}></div>
                    <p className={step >= 3 ? 'step-item step-item-active' : 'step-item'}>3</p>
                </div>
                <form>
                    {step === 1 ? (
                        <>
                            <h2>Project Management</h2>
                            <input className="slider" type="range" min={0} max={100} value={scopeSpecificatoins} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScopeSpecificatoins(e.currentTarget.value)} />
                        </>
                    ) : (step === 2) ? (
                        <>
                            
                        </>
                    ) : (
                        <></>
                    )}
                    
                    <button id="submit" onClick={handleButton}>{step < 3 ? 'Next' : 'Save'}</button>
                </form>
            </section>
        </div>
    );
}

export default FinishProject;