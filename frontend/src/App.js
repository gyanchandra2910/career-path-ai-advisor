import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CareerAssessment from './pages/CareerAssessment';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<CareerAssessment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-profile" element={<CreateProfile />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
