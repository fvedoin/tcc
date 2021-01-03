import React, {useEffect, useState} from "react";
import { Pratices } from "../../dto/pratices";
import api from "../../services/api";

interface Props {
	reportId: number;
	successFactor: string;
}

const PraticesList: React.FC<Props> = ({ reportId, successFactor, ...rest }) => {
    
    const [pratices, setPratices] = useState([]);

    useEffect(() => {
        if(reportId && successFactor){
            api.get(`final-report/${reportId}/pratices/${successFactor}`).then(response => {
                setPratices(response.data);
            });
        }
    }, [reportId, successFactor]);
    
    return (
		<ul>
			{pratices.map((pratice: Pratices) => (
                <li key={pratice.id}>{pratice.name}</li>
            ))}
		</ul>
	);
};

export default PraticesList;