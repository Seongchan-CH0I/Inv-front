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
            {/* className="quiz-content-wrapper" 제거 */}
            <h1>당신의 성향은</h1>
            <div>
                <p>{result.result}</p>
                <button onClick={onGoHome}>홈으로</button>
            </div>
        </div>
    );
}

export default QuizResult;
