import React from 'react';
import { FaSignOutAlt, FaSearch, FaList } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import { logout } from '../../auth/auth';

import './styles.css';

const LogoutButton: React.FC = (props) => {
    const history = useHistory();
    
    async function handleLogout() {
        logout();
        history.push('/');
    }

    return (
        <div className="nav-bar">
            <Link className="menu-item" to="/list/project"><FaList size="16" /></Link>
            <Link className="menu-item" to="/search"><FaSearch size="16" /></Link>
            <button className="menu-item" onClick={handleLogout}><FaSignOutAlt size="16" /></button>
        </div>
    );
}

export default LogoutButton;