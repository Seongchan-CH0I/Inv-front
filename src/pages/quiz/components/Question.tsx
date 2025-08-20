import React from 'react';
import { Answer, QuizData } from '../../../types/quiz'; // 타입 임포트

interface QuestionProps {
    question: QuizData;
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
            {' '}
            {/* className="quiz-content-wrapper" 제거 */}
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
