import React, { useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Quiz from './pages/quiz/Quiz';

function App() {
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    const handleQuizComplete = () => {
        setIsQuizCompleted(true);
    };

    return (
        <div className="app-container">
            {isQuizCompleted ? (
                <Home />
            ) : (
                <Quiz onQuizComplete={handleQuizComplete} />
            )}
        </div>
    );
}

export default App;
