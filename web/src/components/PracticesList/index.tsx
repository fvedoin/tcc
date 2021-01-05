import React, {useEffect, useState} from "react";
import { Practices } from "../../dto/practices";
import api from "../../services/api";

interface Props {
	reportId: number;
	successFactor: string;
}

const PracticesList: React.FC<Props> = ({ reportId, successFactor, ...rest }) => {
    
    const [practices, setPractices] = useState([]);

    useEffect(() => {
        if(reportId && successFactor){
            api.get(`final-report/${reportId}/practices/${successFactor}`).then(response => {
                setPractices(response.data);
                console.log(response.data);
            });
        }
    }, [reportId, successFactor]);
    
    return (
		<ul>
			{practices.map((practice: Practices) => (
                <li key={practice.id}>{practice.name}</li>
            ))}
		</ul>
	);
};

export default PracticesList;