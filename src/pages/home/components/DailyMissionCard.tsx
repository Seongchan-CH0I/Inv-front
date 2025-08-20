import React from 'react';
import { DailyMissionPreviewDTO } from '../../../types/dashboard';

interface DailyMissionCardProps {
    mission: DailyMissionPreviewDTO;
}

function DailyMissionCard({ mission }: DailyMissionCardProps) {
    return (
        <div
            className="dashboard-card"
            onClick={() => (window.location.href = mission.missionUrl)}
        >
            <h2>일일 미션</h2>
            <p>{mission.previewText}</p>
        </div>
    );
}

export default DailyMissionCard;
