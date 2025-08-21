import React, { useState, useEffect } from 'react';
import './Home.css';
import DailyMissionCard from './components/DailyMissionCard';
import LearningCard from './components/LearningCard';
import MarketCard from './components/MarketCard';
import { HomeDashboardDTO } from '../../types/dashboard';

import { Link } from 'react-router-dom';

function Home() {
    const [dashboardData, setDashboardData] = useState<HomeDashboardDTO | null>(
        null,
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/home/dashboard');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: HomeDashboardDTO = await response.json();
                setDashboardData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div>대시보드를 불러오는 중...</div>;
    }

    if (error) {
        return <div>데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
    }

    if (!dashboardData) {
        return <div>표시할 데이터가 없습니다.</div>;
    }

    return (
        <div>
            <h1>My Dashboard</h1>
            <Link to="/home">
                <DailyMissionCard mission={dashboardData.dailyMissionPreview} />
            </Link>
            <Link to="/learning">
                <LearningCard learning={dashboardData.learningPreview} />
            </Link>
            <Link to="/market">
                <MarketCard market={dashboardData.marketPreview} />
            </Link>
        </div>
    );
}

export default Home;
