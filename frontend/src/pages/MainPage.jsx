import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import QueueDisplay from '../components/QueueDisplay';

const socket = io();

export default function MainPage() {
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState('grant');
  const [queue, setQueue] = useState([]);
  const [latest, setLatest] = useState(null);

  // Отправка формы регистрации
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/queue/register', {
        full_name: fullName,
        category,
      });
      setLatest(res.data);
      setFullName('');
      setCategory('grant');
    } catch (err) {
      alert("Ошибка при регистрации");
    }
  };

  // Загрузка очереди при старте
  const fetchQueue = async () => {
    try {
      const res = await axios.get('/api/queue');
      setQueue(res.data);
    } catch (err) {
      console.error("Ошибка загрузки очереди");
    }
  };

  useEffect(() => {
    fetchQueue();

    socket.on('new_registration', (data) => {
      setQueue((prev) => [...prev, data]);
    });

    socket.on('call', (data) => {
      setQueue((prev) =>
        prev.map((entry) =>
          entry.number === data.number
            ? { ...entry, status: 'called', desk: data.desk }
           : entry
       )
      );
    });



    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Очередь для абитуриентов</h1>

      {/* 📋 Форма регистрации */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="ФИО"
          className="border p-2 w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="grant">Бакалавр (Грант)</option>
          <option value="paid">Бакалавр (Платное)</option>
          <option value="magistracy">Магистратура</option>
          <option value="phd">PhD</option>
          <option value="platonus">Platonus</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Получить номер
        </button>
      </form>

      {/* ✅ Последний зарегистрированный */}
      {latest && (
        <div className="mb-6 text-green-600 font-semibold">
          Зарегистрирован №{latest.number}: {latest.message}
        </div>
      )}

      {/* 🧾 Отображение очереди */}
      <QueueDisplay queue={queue} />
    </div>
  );
}
