// frontend/src/components/LiveQueueFeed.jsx
import React from 'react';

export default function LiveQueueFeed({ queueList }) {
  return (
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
  );
}
