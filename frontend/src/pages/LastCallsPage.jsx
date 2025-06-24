import React, { useEffect, useState } from 'react';

function LastCallsPage() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCalls = () => {
      fetch('/api/queue/last-calls')
        .then(res => res.json())
        .then(data => setCalls(data));
    };
    fetchCalls();
    const interval = setInterval(fetchCalls, 5000); // автообновление каждые 5 сек
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8 tracking-widest">Табло вызова</h1>
        <table className="w-full text-xl">
          <thead>
            <tr className="text-blue-700 border-b-2 border-blue-300">
              <th className="py-2">№</th>
              <th className="py-2">Время</th>
              <th className="py-2">ФИО</th>
              <th className="py-2">Стол</th>
            </tr>
          </thead>
          <tbody>
            {calls.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-8">Нет вызовов</td>
              </tr>
            ) : (
              calls.map((call) => (
                <tr key={call.id} className="hover:bg-blue-50 transition">
                  <td className="py-3 font-bold text-2xl text-blue-900 text-center">{call.number}</td>
                  <td className="py-3 text-center text-gray-700">{new Date(call.timestamp).toLocaleTimeString('ru-RU')}</td>
                  <td className="py-3 text-center text-gray-700">{call.full_name || '-'}</td>
                  <td className="py-3 text-center text-gray-700">{call.desk || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LastCallsPage;