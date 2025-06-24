// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage'; // перемещаем в /pages для логичности

export default function App() {
  return (
    <Router>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Навигация */}
        <nav className="mb-6 flex justify-between items-center border-b pb-2">
          <Link to="/" className="text-blue-600 hover:underline text-lg">🏠 Главная</Link>
          <Link to="/admin" className="text-blue-600 hover:underline text-lg">🛠 Админка</Link>
        </nav>

        {/* Роутинг */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}
