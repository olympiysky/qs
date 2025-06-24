// frontend/src/components/CallNextForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function CallNextForm() {
  const [category, setCategory] = useState('grant');
  const [desk, setDesk] = useState('');
  const [callResult, setCallResult] = useState(null);

  const handleCall = async () => {
    if (!desk || !category) {
      alert("Заполните категорию и номер стола");
      return;
    }

    try {
      const response = await axios.post('/api/queue/call', {
        category,
        desk,
      });
      setCallResult(response.data);
    } catch (err) {
      alert("Ошибка вызова: " + err.message);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Вызов следующего</h2>

      <select
        className="border p-2 w-full mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="grant">Bachelor (Grant)</option>
        <option value="paid">Bachelor (Paid)</option>
        <option value="magistracy">Magistracy</option>
        <option value="phd">PhD</option>
        <option value="platonus">Platonus</option>
      </select>

      <input
        type="number"
        placeholder="Номер стола"
        className="border p-2 w-full mb-2"
        value={desk}
        onChange={(e) => setDesk(e.target.value)}
      />

      <button
        onClick={handleCall}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Вызвать следующего ({category})
      </button>

      {callResult && (
        <div className="mt-2 text-blue-700">
          {callResult.success
            ? `Вызван #${callResult.number} на стол ${callResult.desk}`
            : callResult.message}
        </div>
      )}
    </div>
  );
}
