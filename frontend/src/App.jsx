// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './components/AdminPage';

export default function App() {
  return (
    <Router>
      <div className="p-6 max-w-4xl mx-auto">
        <nav className="mb-6 flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline text-lg">🏠 Главная</Link>
          <Link to="/admin" className="text-blue-600 hover:underline text-lg">🛠 Админка</Link>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}
