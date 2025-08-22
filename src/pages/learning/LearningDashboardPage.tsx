import React from 'react';
import LearningRoadmapBlock from './components/LearningRoadmapBlock';
import KnowledgeLibraryCard from './components/KnowledgeLibraryCard';
import './LearningDashboardPage.css';

const LearningDashboardPage: React.FC = () => {
    return (
        <div className="learning-dashboard">
            <div className="card-container">
                <LearningRoadmapBlock />
                <KnowledgeLibraryCard />
            </div>
        </div>
    );
};

export default LearningDashboardPage;
