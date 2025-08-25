import React from 'react';
import { useNavigate } from 'react-router-dom';
import TierBlock from './TierBlock';
import './LearningRoadmapBlock.css';
import { useUserInfo } from '../../../hooks/useUserInfo';

const LearningRoadmapBlock: React.FC = () => {
    const navigate = useNavigate();
    const { data: userInfo, isLoading, error } = useUserInfo();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>사용자 정보를 불러오는 데 실패했습니다.</div>;
    }

    const allTiers: { [key: string]: string[] } = {
        농부: ['밭을 일구는 자', '씨앗을 감별하는 자', '대지를 이해하는 자'],
        사냥꾼: ['사냥꾼 티어 1', '사냥꾼 티어 2', '사냥꾼 티어 3'],
        승부사: ['승부사 티어 1', '승부사 티어 2', '승부사 티어 3'],
    };

    const tierPaths: { [key: string]: string } = {
        '밭을 일구는 자': '/learning/pages/farmer/cultivator/cultivator1',
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
        return <div>사용자 정보가 없습니다.</div>;
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
