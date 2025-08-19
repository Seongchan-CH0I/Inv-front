import React, { useState, useEffect } from 'react';
import './App.css';

// -----------------------------------------------------------------------------
// 1. 데이터 타입 정의 (Interfaces)
// 백엔드 DTO와 일치해야 합니다.
// -----------------------------------------------------------------------------
interface Answer {
    id: number;
    answerText: string;
    score: number;
}

interface Quiz {
    id: number;
    questionText: string;
    answers: Answer[];
}

interface QuizSubmissionRequest {
    answers: { [questionId: number]: number }; // Key: questionId, Value: score
}

interface QuizSubmissionResponse {
    totalScore: number;
    result: string;
}

// -----------------------------------------------------------------------------
// 2. 메인 App 컴포넌트
// -----------------------------------------------------------------------------
function App() {
    // -------------------------------------------------------------------------
    // 2.1. 상태 관리 (State Management)
    // 컴포넌트의 데이터를 관리하는 부분입니다.
    // -------------------------------------------------------------------------
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    // 사용자의 답변을 저장할 Map: Key는 questionId, Value는 score
    const [userAnswers, setUserAnswers] = useState<Map<number, number>>(
        new Map(),
    );
    const [quizResult, setQuizResult] = useState<QuizSubmissionResponse | null>(
        null,
    ); // 퀴즈 결과 저장

    // -------------------------------------------------------------------------
    // 2.2. 데이터 로딩 로직 (Data Fetching Logic)
    // 컴포넌트 마운트 시 퀴즈 데이터를 백엔드에서 불러옵니다.
    // -------------------------------------------------------------------------
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch('/api/quiz');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuizzes(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때 한 번만 실행

    // -------------------------------------------------------------------------
    // 2.3. 이벤트 핸들러 (Event Handlers)
    // 사용자 인터랙션에 반응하는 함수들입니다.
    // -------------------------------------------------------------------------
    const handleAnswerSelection = (
        quizId: number,
        selectedAnswerScore: number,
    ) => {
        setUserAnswers((prev) =>
            new Map(prev).set(quizId, selectedAnswerScore),
        );
        // 다음 퀴즈로 이동 (선택 후 약간의 딜레이)
        setTimeout(() => {
            setCurrentQuizIndex((prevIndex) => prevIndex + 1);
        }, 300);
    };

    // handleRestartQuiz 함수 삭제

    const handleSubmitQuiz = async () => {
        setLoading(true); // 제출 중 로딩 상태
        setError(null); // 에러 초기화
        setQuizResult(null); // 이전 결과 초기화

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionRequest),
            });

            if (!response.ok) {
                throw new Error('Quiz submission failed');
            }

            const resultData: QuizSubmissionResponse = await response.json();
            setQuizResult(resultData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // -------------------------------------------------------------------------
    // 2.4. 조건부 렌더링 (Conditional Rendering)
    // 로딩, 에러, 퀴즈 없음, 퀴즈 완료 상태에 따른 화면 표시
    // -------------------------------------------------------------------------
    if (loading) {
        return <div className="app-container">퀴즈를 불러오는 중...</div>;
    }

    if (error) {
        return <div className="app-container">에러 발생: {error}</div>;
    }

    if (quizzes.length === 0) {
        return <div className="app-container">퀴즈가 없습니다.</div>;
    }

    // 모든 퀴즈를 다 풀었을 경우
    if (currentQuizIndex >= quizzes.length) {
        return (
            <div className="app-container">
                <h1>당신의 성향은</h1>
                {quizResult ? ( // 퀴즈 결과가 있으면 표시
                    <div>
                        <p>{quizResult.result}</p>
                    </div>
                ) : (
                    // 없으면 결과 보기 버튼 표시
                    <div>
                        <p>결과를 보려면 아래 버튼을 눌러주세요.</p>
                        <button onClick={handleSubmitQuiz}>결과 보기</button>
                    </div>
                )}
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // 2.5. 메인 퀴즈 렌더링 (Main Quiz Rendering)
    // 현재 퀴즈를 화면에 표시합니다.
    // -------------------------------------------------------------------------
    const currentQuiz = quizzes[currentQuizIndex];

    return (
        <div className="app-container">
            <h1>퀴즈</h1>
            <form>
                <div key={currentQuiz.id}>
                    <h3>
                        {currentQuizIndex + 1}. {currentQuiz.questionText}
                    </h3>
                    <ul>
                        {currentQuiz.answers.map((answer) => (
                            <li key={answer.id}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`quiz-${currentQuiz.id}`}
                                        value={answer.id}
                                        checked={
                                            userAnswers.get(currentQuiz.id) ===
                                            answer.score
                                        } // score로 비교
                                        onChange={() =>
                                            handleAnswerSelection(
                                                currentQuiz.id,
                                                answer.score,
                                            )
                                        } // score 전달
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

export default App;
