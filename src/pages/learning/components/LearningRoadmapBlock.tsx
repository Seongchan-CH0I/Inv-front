import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TierBlock from './TierBlock';
import './LearningRoadmapBlock.css';

interface UserRoadmapInfo {
    title: string;
    tier: string;
}

const LearningRoadmapBlock: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserRoadmapInfo | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = () => {
            const mockData: UserRoadmapInfo = {
                // todo: 유저의 실제 타이틀과 티어 불러와야 함
                title: '농부',
                tier: '밭을 일구는 자',
            };
            setUserInfo(mockData);
        };

        fetchUserInfo();
    }, []);

    const allTiers: { [key: string]: string[] } = {
        농부: ['밭을 일구는 자', '씨앗을 감별하는 자', '대지를 이해하는 자'],
        사냥꾼: ['사냥꾼 티어 1', '사냥꾼 티어 2', '사냥꾼 티어 3'],
        승부사: ['승부사 티어 1', '승부사 티어 2', '승부사 티어 3'],
    };

    const tierPaths: { [key: string]: string } = {
        '밭을 일구는 자': '/learning/pages/farmer/cultivator',
        '씨앗을 감별하는 자': '/learning/pages/farmer/seed-identifier',
        '대지를 이해하는 자': '/learning/pages/farmer/land-understander',
        '사냥꾼 티어 1': '/learning/pages/hunter/HunterPage',
        '사냥꾼 티어 2': '/learning/pages/hunter/HunterPage',
        '사냥꾼 티어 3': '/learning/pages/hunter/HunterPage',
        '승부사 티어 1': '/learning/pages/gambler/GamblerPage',
        '승부사 티어 2': '/learning/pages/gambler/GamblerPage',
        '승부사 티어 3': '/learning/pages/gambler/GamblerPage',
    };

    const handleTierClick = (tierName: string) => {
        const path = tierPaths[tierName];
        if (path) {
            navigate(path);
        } else {
            alert(`Path not found for tier: ${tierName}`);
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const currentTitleTiers = allTiers[userInfo.title] || [];

    return (
        <div className="dashboard-block">
            <h2>공부 로드맵</h2>
            <h3 className="user-title">{userInfo.title}</h3>
            <div className="tier-blocks-container">
                {currentTitleTiers.map((tierName, index) => (
                    <TierBlock
                        key={index}
                        tierName={tierName}
                        isActive={userInfo.tier === tierName}
                        onClick={() => handleTierClick(tierName)}
                    />
                ))}
            </div>
        </div>
    );
};

export default LearningRoadmapBlock;
