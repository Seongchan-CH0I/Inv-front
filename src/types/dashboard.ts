export interface DailyMissionPreviewDTO {
    previewText: string;
    missionUrl: string;
}

export interface LearningPreviewDTO {
    title: string;
    recentArticles: string[];
    learningUrl: string;
}

export interface MarketPreviewDTO {
    marketStatus: string;
    marketIndexName: string;
    marketIndexValue: number;
    marketIndexChange: number;
    marketUrl: string;
}

export interface HomeDashboardDTO {
    dailyMissionPreview: DailyMissionPreviewDTO;
    learningPreview: LearningPreviewDTO;
    marketPreview: MarketPreviewDTO;
}
