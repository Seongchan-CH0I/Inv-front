import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // We'll create this later for styling

const NavigationBar: React.FC = () => {
    return (
        <nav className="navigation-bar">
            <Link to="/home" className="nav-button">
                홈
            </Link>
            <Link to="/learning" className="nav-button">
                공부
            </Link>
            <Link to="/market" className="nav-button">
                실전
            </Link>
            <Link to="/users/me" className="nav-button">
                내 정보
            </Link>
        </nav>
    );
};

export default NavigationBar;
