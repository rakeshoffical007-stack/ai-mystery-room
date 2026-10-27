import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreateMysteryPage from './pages/CreateMysteryPage';
import InvestigationPage from './pages/InvestigationPage';
import AccusationPage from './pages/AccusationPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-noir-950 flex flex-col justify-between text-slate-100 selection:bg-amberGold-500 selection:text-noir-950">
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateMysteryPage />} />
              <Route path="/case/:id" element={<InvestigationPage />} />
              <Route path="/case/:id/accuse" element={<AccusationPage />} />
              <Route path="/case/:id/result" element={<ResultsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
