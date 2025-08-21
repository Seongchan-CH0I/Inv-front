import React from 'react';
import { LearningPreviewDTO } from '../../../types/dashboard';

interface LearningCardProps {
    learning: LearningPreviewDTO;
}

function LearningCard({ learning }: LearningCardProps) {
    return (
        <div className="dashboard-card">
            <h2>학습</h2>
            <h3>{learning.title}</h3>
            <ul>
                {learning.recentArticles.map((article, index) => (
                    <li key={index}>{article}</li>
                ))}
            </ul>
        </div>
    );
}

export default LearningCard;
