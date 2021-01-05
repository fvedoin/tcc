import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { logout } from '../../auth/auth';

import './styles.css';

const LogoutButton: React.FC = (props) => {
    const history = useHistory();
    
    async function handleLogout() {
        logout();
        history.push('/');
    }

    return (
        <button className="logout-button" onClick={handleLogout}><FaSignOutAlt size="16" /></button>
    );
}

export default LogoutButton;