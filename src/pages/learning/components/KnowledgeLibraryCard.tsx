import React from 'react';
import { Link } from 'react-router-dom';
import '../LearningDashboardPage.css';

const KnowledgeLibraryCard: React.FC = () => {
    return (
        <Link to="/learning/library" className="dashboard-block">
            <h2>지식 라이브러리</h2>
            <p>학습한 내용을 정리하고 다시 보세요.</p>
        </Link>
    );
};

export default KnowledgeLibraryCard;
