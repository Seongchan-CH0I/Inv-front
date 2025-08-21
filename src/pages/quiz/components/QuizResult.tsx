import React from 'react';
import { QuizSubmissionResponse } from '../../../types/quiz'; // 타입 임포트

interface QuizResultProps {
    result: QuizSubmissionResponse;
    onGoHome: () => void;
}

function QuizResult({ result, onGoHome }: QuizResultProps) {
    return (
        <div>
            {' '}
            <h1>당신의 성향은</h1>
            <div>
                <p>{result.result}</p>
                <button onClick={onGoHome}>나만의 투자 원칙 세우러 가기</button>
            </div>
        </div>
    );
}

export default QuizResult;
