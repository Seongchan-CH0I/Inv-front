import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import LearningDashboardPage from './pages/learning/LearningDashboardPage';

import KnowledgeLibraryPage from './pages/learning/pages/KnowledgeLibraryPage';
import Cultivator1 from './pages/learning/pages/farmer/cultivator/cultivator1';
import Cultivator2 from './pages/learning/pages/farmer/cultivator/cultivator2';
import SeedIdentifier from './pages/learning/pages/farmer/seed-identifier';
import LandUnderstander from './pages/learning/pages/farmer/land-understander';
import HunterPage from './pages/learning/pages/hunter/HunterPage';
import GamblerPage from './pages/learning/pages/gambler/GamblerPage';
import MarketPage from './pages/market/MarketPage';
import UsersMePage from './pages/usersme/UsersMePage';
import Quiz from './pages/quiz/Quiz';
import MainLayout from './components/MainLayout'; // Import MainLayout

function App() {
    const START_WITH_QUIZ = false;

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
                    <Route
                        path="/learning"
                        element={<LearningDashboardPage />}
                    />

                    <Route
                        path="/learning/library"
                        element={<KnowledgeLibraryPage />}
                    />
                    <Route
                        path="/learning/pages/farmer/cultivator/cultivator1"
                        element={<Cultivator1 />}
                    />
                    <Route
                        path="/learning/pages/farmer/cultivator/cultivator2"
                        element={<Cultivator2 />}
                    />
                    <Route
                        path="/learning/pages/farmer/seed-identifier"
                        element={<SeedIdentifier />}
                    />
                    <Route
                        path="/learning/pages/farmer/land-understander"
                        element={<LandUnderstander />}
                    />
                    <Route
                        path="/learning/pages/hunter/HunterPage"
                        element={<HunterPage />}
                    />
                    <Route
                        path="/learning/pages/gambler/GamblerPage"
                        element={<GamblerPage />}
                    />
                    <Route path="/market" element={<MarketPage />} />
                    <Route path="/users/me" element={<UsersMePage />} />
                    <Route path="/quiz" element={<Quiz />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
