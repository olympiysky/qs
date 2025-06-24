// frontend/src/components/TicketPrint.jsx
import React, { useEffect } from "react";

export default function TicketPrint({ entry }) {
  useEffect(() => {
    window.print();
  }, []);

  const date = new Date().toLocaleString("ru-RU");
  const category = getCategory(entry.number).label;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", textAlign: "center" }}>
      <h1>Талон</h1>
      <h2>Номер: {entry.number.toString().padStart(3, '0')}</h2>
      <p><strong>ФИО:</strong> {entry.name}</p>
      <p><strong>Категория:</strong> {category}</p>
      <p><strong>Стол:</strong> {entry.desk || "Ожидайте назначения"}</p>
      <p><strong>Дата и время:</strong> {date}</p>
    </div>
  );
}

const getCategory = (number) => {
  if (number >= 1 && number <= 499) return { label: "Бакалавр (грант)" };
  if (number >= 500 && number <= 599) return { label: "Бакалавр (платное)" };
  if (number >= 600 && number <= 699) return { label: "Магистратура" };
  if (number >= 700 && number <= 799) return { label: "PhD" };
  if (number >= 800 && number <= 999) return { label: "Platonus" };
  return { label: "Неизвестно" };
};
