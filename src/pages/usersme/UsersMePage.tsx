import React, { useState, useEffect } from 'react';

const UsersMePage: React.FC = () => {
    const [userTitle, setUserTitle] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserTitle = async () => {
            try {
                const response = await fetch('/api/user/title');
                if (!response.ok) {
                    throw new Error('Failed to fetch user title');
                }
                const data = await response.json();
                setUserTitle(data.title); // Assuming the response has a 'title' field
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserTitle();
    }, []);

    if (loading) {
        return <div>사용자 타이틀을 불러오는 중...</div>;
    }

    if (error) {
        return <div>에러 발생: {error}</div>;
    }

    return (
        <div>
            <h1>내 정보 대시보드</h1>
            <p>여기에 사용자 정보 관련 내용이 표시됩니다.</p>
            {userTitle && (
                <p>
                    현재 타이틀: <strong>{userTitle}</strong>
                </p>
            )}
        </div>
    );
};

export default UsersMePage;
