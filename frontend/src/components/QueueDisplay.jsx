// frontend/src/components/QueueDisplay.jsx
import React, { useState } from "react";
import "./QueueDisplay.css";

const getCategory = (number) => {
  if (number >= 1 && number <= 499) return { label: "Бакалавр (грант)", color: "blue" };
  if (number >= 500 && number <= 599) return { label: "Бакалавр (платное)", color: "green" };
  if (number >= 600 && number <= 699) return { label: "Магистратура", color: "purple" };
  if (number >= 700 && number <= 799) return { label: "PhD", color: "maroon" };
  if (number >= 800 && number <= 999) return { label: "Platonus", color: "gray" };
  return { label: "Неизвестно", color: "black" };
};

export default function QueueDisplay({ queue }) {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredQueue = queue.filter((entry) => {
    if (filter === "all") return true;
    const desk = entry.desk;
    if (filter === "1-10") return desk >= 1 && desk <= 10;
    if (filter === "11-12") return desk === 11 || desk === 12;
    if (filter === "305-307") return [305, 306, 307].includes(desk);
    return true;
  });

  return (
    <div>
      <h2>Очередь</h2>
      <select value={filter} onChange={handleFilterChange}>
        <option value="all">Все столы</option>
        <option value="1-10">Столы 1–10</option>
        <option value="11-12">Столы 11–12</option>
        <option value="305-307">Каб. 305–307</option>
      </select>

      <table className="queue-table">
        <thead>
          <tr>
            <th>Номер</th>
            <th>ФИО</th>
            <th>Стол</th>
            <th>Категория</th>
          </tr>
        </thead>
        <tbody>
          {filteredQueue.map((entry, index) => {
            const { label, color } = getCategory(entry.number);
            return (
              <tr key={index}>
                <td>{entry.number}</td>
                <td>{entry.name}</td>
                <td>{entry.desk}</td>
                <td style={{ color }}>{label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
