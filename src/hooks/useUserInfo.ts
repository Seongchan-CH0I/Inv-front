import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../api/apiClient';

interface UserProfileDTO {
    nickname: string;
    tier: string;
    title: string;
}

interface UserRoadmapInfo {
    title: string;
    tier: string;
}

async function fetchUserInfo(): Promise<UserRoadmapInfo> {
    const backendData = await apiFetch<UserProfileDTO>(
        '/api/learning/dashboard',
    );
    return {
        title: backendData.title,
        tier: backendData.tier,
    };
}

export function useUserInfo() {
    return useQuery<UserRoadmapInfo, Error>({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo,
    });
}
