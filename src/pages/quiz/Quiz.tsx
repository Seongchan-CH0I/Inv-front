import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import QuizResult from './components/QuizResult';
import './Quiz.css';
import {
    QuizData,
    QuizSubmissionRequest,
    QuizSubmissionResponse,
} from '../../types/quiz';
import { useNavigate } from 'react-router-dom';

function Quiz() {
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState<QuizData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<Map<number, number>>(
        new Map(),
    );
    const [quizResult, setQuizResult] = useState<QuizSubmissionResponse | null>(
        null,
    );
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchQuizData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/quiz');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: QuizData[] = await response.json();
                setQuizzes(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizData();
    }, []);

    const handleAnswerSelection = (
        quizId: number,
        selectedAnswerScore: number,
    ) => {
        setUserAnswers((prev) =>
            new Map(prev).set(quizId, selectedAnswerScore),
        );
        setTimeout(() => {
            setCurrentQuizIndex((prevIndex) => prevIndex + 1);
        }, 300);
    };

    const handleSubmitQuiz = async () => {
        setLoading(true);
        setError(null);
        setQuizResult(null);

        const answersMap: { [questionId: number]: number } = {};
        userAnswers.forEach((score, questionId) => {
            answersMap[questionId] = score;
        });

        const submissionRequest: QuizSubmissionRequest = {
            answers: answersMap,
        };

        try {
            const response = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionRequest),
            });

            if (!response.ok) {
                throw new Error('Quiz submission failed');
            }

            const resultData: QuizSubmissionResponse = await response.json();
            setQuizResult(resultData);
            setIsSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>퀴즈를 불러오는 중...</div>;
    if (error) return <div>에러 발생: {error}</div>;
    if (quizzes.length === 0) return <div>퀴즈가 없습니다.</div>;

    const isQuizFinished = currentQuizIndex >= quizzes.length;

    return (
        <div>
            {isQuizFinished ? (
                isSubmitted && quizResult ? (
                    <QuizResult
                        result={quizResult}
                        onGoHome={() => navigate('/home')}
                    />
                ) : (
                    <div>
                        <h1>결과 보기</h1>
                        <p>결과를 보려면 아래 버튼을 눌러주세요.</p>
                        <button onClick={handleSubmitQuiz} disabled={loading}>
                            {loading ? '제출 중...' : '결과 보기'}
                        </button>
                    </div>
                )
            ) : (
                <div>
                    <Question
                        question={quizzes[currentQuizIndex]}
                        questionNumber={currentQuizIndex + 1}
                        userAnswer={userAnswers.get(
                            quizzes[currentQuizIndex].id,
                        )}
                        onAnswerSelect={handleAnswerSelection}
                    />
                </div>
            )}
        </div>
    );
}

export default Quiz;
