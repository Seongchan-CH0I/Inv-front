import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import LearningPage from './pages/learning/LearningPage';
import MarketPage from './pages/market/MarketPage';
import UsersMePage from './pages/usersme/UsersMePage';
import Quiz from './pages/quiz/Quiz';
import MainLayout from './components/MainLayout'; // Import MainLayout

function App() {
    const START_WITH_QUIZ = false; // Set to true to start with Quiz, false to start with Home

    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to={START_WITH_QUIZ ? '/quiz' : '/home'}
                                replace
                            />
                        }
                    />
                    <Route path="/home" element={<Home />} />
                    <Route path="/learning" element={<LearningPage />} />
                    <Route path="/market" element={<MarketPage />} />
                    <Route path="/users/me" element={<UsersMePage />} />
                    <Route path="/quiz" element={<Quiz />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
