import { createContext, useContext, useState, useMemo } from "react";

const AppCtx = createContext(null);

export default function ApplicationProvider({ children }) {
  const [dates, setDates] = useState({ start: "", end: "" });
  const [travellers, setTravellers] = useState([]); // [{id,...}]
  const [visaMeta, setVisaMeta] = useState(null);   // {slug, purpose, title, eta, type, price?}

  const addTraveller = (t) => setTravellers((s) => [...s, { id: crypto.randomUUID(), ...t }]);
  const updateTraveller = (id, patch) =>
    setTravellers((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const removeTraveller = (id) => setTravellers((s) => s.filter((x) => x.id !== id));

  const value = useMemo(
    () => ({ dates, setDates, travellers, addTraveller, updateTraveller, removeTraveller, visaMeta, setVisaMeta }),
    [dates, travellers, visaMeta]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export const useApp = () => useContext(AppCtx);
