import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import CallNextForm from './components/CallNextForm';

const socket = io();

export default function App() {
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState('grant');
  const [queueList, setQueueList] = useState([]);
  const [latest, setLatest] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/queue/register', {
      full_name: fullName,
      category,
    });
    setLatest(response.data);
    setFullName('');
    setCategory('grant');
  };

  useEffect(() => {
    socket.on('new_registration', (data) => {
      setQueueList((prev) => [...prev, data]);
    });
    socket.on('call', (data) => {
      console.log('Вызов:', data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">University Queue System</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Full name"
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
          <option value="grant">Bachelor (Grant)</option>
          <option value="paid">Bachelor (Paid)</option>
          <option value="magistracy">Magistracy</option>
          <option value="phd">PhD</option>
          <option value="platonus">Platonus</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>

      {latest && (
        <div className="mb-6 text-green-600 font-semibold">
          Registered #{latest.number}: {latest.message}
        </div>
      )}

      {/* 🔔 Кнопка вызова */}
      <CallNextForm />

      <div>
        <h2 className="text-xl font-semibold mb-2">Live Queue Feed</h2>
        <ul className="border rounded p-4 bg-gray-100 space-y-2">
          {queueList.map((entry, index) => (
            <li key={index} className="border-b pb-1">
              #{entry.number} — {entry.full_name} ({entry.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
