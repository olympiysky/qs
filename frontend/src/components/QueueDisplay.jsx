import React, { useState } from "react";

// Функция для определения категории и цвета
const getCategoryInfo = (number) => {
  if (number >= 1 && number <= 499) return { label: "Бакалавр (Грант)", color: "text-blue-600" };
  if (number >= 500 && number <= 599) return { label: "Бакалавр (Платное)", color: "text-green-600" };
  if (number >= 600 && number <= 699) return { label: "Магистратура", color: "text-purple-600" };
  if (number >= 700 && number <= 799) return { label: "PhD", color: "text-red-600" };
  if (number >= 800 && number <= 999) return { label: "Platonus", color: "text-gray-600" };
  return { label: "Неизвестно", color: "text-black" };
};

export default function QueueDisplay({ queue }) {
  const [filter, setFilter] = useState("all");

  // Фильтрация по столам
  const filteredQueue = queue.filter((entry) => {
    const deskNum = parseInt(entry.desk);
    if (filter === "all") return true;
    if (filter === "1-10") return deskNum >= 1 && deskNum <= 10;
    if (filter === "11-12") return deskNum === 11 || deskNum === 12;
    if (filter === "305-307") return [305, 306, 307].includes(deskNum);
    return true;
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Текущая очередь</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Фильтр по столу:</label>
        <select
          className="border rounded p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Все столы</option>
          <option value="1-10">Столы 1–10</option>
          <option value="11-12">Столы 11–12</option>
          <option value="305-307">Каб. 305–307</option>
        </select>
      </div>

      {filteredQueue.length === 0 ? (
        <div className="text-gray-500 italic">Нет абитуриентов в очереди</div>
      ) : (
        <table className="w-full table-auto border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-3 py-2 text-left">Номер</th>
              <th className="px-3 py-2 text-left">ФИО</th>
              <th className="px-3 py-2 text-left">Стол</th>
              <th className="px-3 py-2 text-left">Категория</th>
              <th className="px-3 py-2 text-left">Статус</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueue.map((entry, idx) => {
              const { label, color } = getCategoryInfo(entry.number);
              return (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{entry.number}</td>
                  <td className="px-3 py-2">{entry.full_name}</td>
                  <td className="px-3 py-2">{entry.desk || "–"}</td>
                  <td className={`px-3 py-2 font-medium ${color}`}>{label}</td>
                  <td className="px-3 py-2 text-sm">
                    {entry.status === "called" ? (
                      <span className="text-orange-600 font-medium">Вызван</span>
                    ) : (
                      <span className="text-green-700">Ожидает</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
