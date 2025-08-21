import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from './NavigationBar'; // Assuming NavigationBar is in the same components folder

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="app-container">
            {children}
            {location.pathname !== '/quiz' && <NavigationBar />}
        </div>
    );
};

export default MainLayout;
