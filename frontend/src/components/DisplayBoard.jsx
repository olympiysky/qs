// frontend/src/components/DisplayBoard.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./DisplayBoard.css";

const socket = io("http://localhost:5000");

export default function DisplayBoard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    socket.on("new_entry", (entry) => {
      setEntries((prev) => [entry, ...prev].slice(0, 6)); // последние 6 вызовов
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="board-container">
      <h1>Очередь</h1>
      <div className="board-table">
        {entries.map((entry, index) => (
          <div className="board-row" key={index}>
            <div className="board-number">№{entry.number.toString().padStart(3, "0")}</div>
            <div className="board-name">{entry.name}</div>
            <div className="board-desk">Стол {entry.desk}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
