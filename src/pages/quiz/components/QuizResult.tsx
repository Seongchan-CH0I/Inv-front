import React from 'react';

interface QuizResultProps {
    result: {
        totalScore: number;
        result: string;
    };
    onGoHome: () => void;
}

function QuizResult({ result, onGoHome }: QuizResultProps) {
    return (
        <div>
            <h1>당신의 성향은</h1>
            <div>
                <p>{result.result}</p>
                <button onClick={onGoHome}>홈으로</button>
            </div>
        </div>
    );
}

export default QuizResult;
