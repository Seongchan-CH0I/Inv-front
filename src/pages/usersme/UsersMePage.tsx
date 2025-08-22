import React, { useState, useEffect } from 'react';

interface UserProfile {
    nickname: string;
    tier: string;
    title: string;
}

const UsersMePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('/api/user/profile');
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data: UserProfile = await response.json();
                setUserProfile(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>사용자 정보를 불러오는 중...</div>;
    }

    if (error) {
        return <div>에러 발생: {error}</div>;
    }

    return (
        <div>
            <h1>내 정보 대시보드</h1>
            {userProfile && (
                <>
                    <p>
                        <div>닉네임: {userProfile.nickname}</div>
                        <p></p>
                        <strong>{userProfile.title}</strong> -{' '}
                        <strong>{userProfile.tier}</strong>
                    </p>
                </>
            )}
        </div>
    );
};

export default UsersMePage;
