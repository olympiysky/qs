import React from "react";
import TicketPrint from "./TicketPrint";
import { useLocation } from "react-router-dom";

export default function TicketPrintWrapper() {
  const location = useLocation();
  const entry = location.state?.entry;

  if (!entry) return <div>Нет данных для печати</div>;

  return <TicketPrint entry={entry} />;
}
