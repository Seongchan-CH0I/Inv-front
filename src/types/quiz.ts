export interface Answer {
    id: number;
    answerText: string;
    score: number;
}

export interface QuizData {
    id: number;
    questionText: string;
    answers: Answer[];
}

export interface QuizSubmissionRequest {
    answers: { [questionId: number]: number };
}

export interface QuizSubmissionResponse {
    totalScore: number;
    result: string;
}
