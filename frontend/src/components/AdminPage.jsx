// frontend/src/components/AdminPage.jsx
import React, { useState } from "react";
import CallNextForm from "./CallNextForm";
import QueueDisplay from "./QueueDisplay";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("call");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg bg-white p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Страница администратора</h1>

        {/* Навигация */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "call" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("call")}
          >
            Вызов абитуриентов
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "queue" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("queue")}
          >
            Просмотр очереди
          </button>
        </div>

        {/* Содержимое вкладок */}
        {activeTab === "call" && <CallNextForm />}
        {activeTab === "queue" && <QueueDisplay queue={[]} />} {/* Передай реальные данные при необходимости */}
      </div>
    </div>
  );
}
