import React, { useState } from 'react';
import './cultivator.css';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserTier } from '../../../../../api/apiClient';

const quizQuestions = [
    {
        term: '자산 (Asset)',
        question: '다음 중 자산에 대한 올바른 설명은 무엇일까요?',
        options: [
            '농장의 트랙터와 땅',
            '농사를 위해 빌린 돈',
            '농부의 순수한 자기 자본',
            '농작물을 팔아 번 총 금액',
        ],
        correctAnswer: '농장의 트랙터와 땅',
    },
    {
        term: '부채 (Liability)',
        question: '다음 중 부채에 대한 올바른 설명은 무엇일까요?',
        options: [
            '농장의 트랙터와 땅',
            '농사를 위해 빌린 돈',
            '농부의 순수한 자기 자본',
            '농작물을 팔아 번 총 금액',
        ],
        correctAnswer: '농사를 위해 빌린 돈',
    },
    {
        term: '자본 (Equity)',
        question: '다음 중 자본에 대한 올바른 설명은 무엇일까요?',
        options: [
            '농장의 트랙터와 땅',
            '농사를 위해 빌린 돈',
            '농부의 순수한 자기 자본',
            '농작물을 팔아 번 총 금액',
        ],
        correctAnswer: '농부의 순수한 자기 자본',
    },
    {
        term: '수익 (Revenue)',
        question: '다음 중 수익에 대한 올바른 설명은 무엇일까요?',
        options: [
            '농장의 트랙터와 땅',
            '농사를 위해 빌린 돈',
            '농부의 순수한 자기 자본',
            '농작물을 팔아 번 총 금액',
        ],
        correctAnswer: '농작물을 팔아 번 총 금액',
    },
    {
        term: '비용 (Expense)',
        question: '다음 중 비용에 대한 올바른 설명은 무엇일까요?',
        options: [
            '농장의 트랙터와 땅',
            '농사를 위해 빌린 돈',
            '농사짓는 데 들어간 모든 돈',
            '농작물을 팔아 번 총 금액',
        ],
        correctAnswer: '농사짓는 데 들어간 모든 돈',
    },
];

const MultipleChoiceQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: string;
    }>({});
    const [showResults, setShowResults] = useState(false);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateUserTier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            navigate('/learning');
        },
        onError: (error) => {
            console.error('Tier update failed', error);
            alert('티어 업데이트에 실패했습니다.');
        },
    });

    const handleNextStep = () => {
        // userId: 1, tierId: 2 (씨앗을 감별하는 자) 로 티어 업데이트 요청
        // 참고: userId는 실제 인증 로직을 통해 동적으로 받아와야 합니다.
        mutation.mutate({ userId: 1, tierId: 2 });
    };

    const handleOptionSelect = (option: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: option,
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const score = quizQuestions.reduce((acc, question, index) => {
            return selectedAnswers[index] === question.correctAnswer
                ? acc + 1
                : acc;
        }, 0);

        return (
            <div className="mc-results-container">
                <h1 className="cultivator-title">퀴즈 결과</h1>
                <p className="cultivator-subtitle">
                    총점: {score} / {quizQuestions.length}
                </p>
                <div className="mc-results-list">
                    {quizQuestions.map((question, index) => (
                        <div key={index} className="mc-result-list-item-simple">
                            <span>
                                {index + 1}. {question.term}
                            </span>
                            <span
                                className={
                                    selectedAnswers[index] ===
                                    question.correctAnswer
                                        ? 'correct-icon'
                                        : 'incorrect-icon'
                                }
                            >
                                {selectedAnswers[index] ===
                                question.correctAnswer
                                    ? '✔'
                                    : '✖'}
                            </span>
                        </div>
                    ))}
                </div>
                {score < quizQuestions.length ? (
                    <button
                        className="mc-button"
                        onClick={restartQuiz}
                        style={{ marginTop: '20px' }}
                    >
                        다시 풀기
                    </button>
                ) : (
                    <button
                        className="mc-button"
                        style={{ marginTop: '20px' }}
                        onClick={handleNextStep}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? '처리 중...' : '다음 단계로'}
                    </button>
                )}
            </div>
        );
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    return (
        <div className="cultivator-container">
            <h1 className="cultivator-title">객관식 퀴즈</h1>
            <div className="mc-quiz-container">
                <div className="mc-progress-bar-container">
                    <div
                        className="mc-progress-bar"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="mc-question-container">
                    <h3 className="mc-question-term">{currentQuestion.term}</h3>
                    <p className="mc-question-text">
                        {currentQuestion.question}
                    </p>
                    <ul className="mc-options">
                        {currentQuestion.options.map((option, index) => (
                            <li
                                key={index}
                                className={`mc-option ${selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mc-navigation">
                    <button
                        className="mc-button"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        이전
                    </button>
                    {currentQuestionIndex === quizQuestions.length - 1 ? (
                        <button className="mc-button" onClick={handleSubmit}>
                            결과 보기
                        </button>
                    ) : (
                        <button className="mc-button" onClick={handleNext}>
                            다음
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Cultivator2 = () => {
    return <MultipleChoiceQuiz />;
};

export default Cultivator2;
