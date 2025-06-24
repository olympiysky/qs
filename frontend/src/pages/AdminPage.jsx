// frontend/src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallNextForm from '../components/CallNextForm';
import QueueDisplay from '../components/QueueDisplay';

export default function AdminPage() {
  const [queue, setQueue] = useState([]);

  // Загрузка всей очереди
  const fetchQueue = async () => {
    try {
      const res = await axios.get('/api/queue');
      setQueue(res.data);
    } catch (err) {
      console.error('Ошибка при получении очереди:', err);
    }
  };

  // Один раз при монтировании компонента
  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>

      <CallNextForm onCallSuccess={fetchQueue} />

      <div className="mt-10">
        <QueueDisplay queue={queue} />
      </div>
    </div>
  );
}
