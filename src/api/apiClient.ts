export async function apiFetch<T>(
    url: string,
    options?: RequestInit,
): Promise<T> {
    try {
        const response = await fetch(url, options);

        // 응답 본문이 비어있을 수 있으므로, 먼저 확인 후 json()을 호출합니다.
        if (
            response.headers.get('Content-Length') === '0' ||
            response.status === 204
        ) {
            return Promise.resolve({} as T);
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Request failed: ${response.status} ${response.statusText} - ${errorText}`,
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error: ${url}`, error);
        throw error; // 상위에서 처리할 수 있게 다시 던짐
    }
}

// 백엔드 API를 호출하여 사용자의 티어를 업데이트하는 함수
export const updateUserTier = async ({
    userId,
    tierId,
}: {
    userId: number;
    tierId: number;
}) => {
    return apiFetch<void>(`/api/users/${userId}/${tierId}`, {
        method: 'PUT',
    });
};
