import React from 'react';

// 이 컴포넌트에서 사용할 데이터 타입 정의
interface Answer {
    id: number;
    answerText: string;
    score: number;
}

interface QuestionData {
    id: number;
    questionText: string;
    answers: Answer[];
}

interface QuestionProps {
    question: QuestionData;
    questionNumber: number;
    userAnswer: number | undefined;
    onAnswerSelect: (questionId: number, score: number) => void;
}

function Question({
    question,
    questionNumber,
    userAnswer,
    onAnswerSelect,
}: QuestionProps) {
    return (
        <div>
            <h1>퀴즈</h1>
            <form>
                <div key={question.id}>
                    <h3>
                        {questionNumber}. {question.questionText}
                    </h3>
                    <ul>
                        {question.answers.map((answer) => (
                            <li key={answer.id}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`quiz-${question.id}`}
                                        value={answer.id}
                                        checked={userAnswer === answer.score}
                                        onChange={() =>
                                            onAnswerSelect(
                                                question.id,
                                                answer.score,
                                            )
                                        }
                                    />
                                    {answer.answerText}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    );
}

export default Question;
