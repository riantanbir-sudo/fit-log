"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fitlog:v1";
export const PLAN_LIMIT = 5;

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);

  // Load from localStorage once on the client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(Array.isArray(data.plan) ? data.plan : []);
        setSaved(Array.isArray(data.saved) ? data.saved : []);
        setDone(Array.isArray(data.done) ? data.done : []);
      }
    } catch {
      // ignore corrupted storage
    }
    setReady(true);
  }, []);

  // Persist every change
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done }));
    } catch {
      // storage might be unavailable (private mode)
    }
  }, [plan, saved, done, ready]);

  const addToPlan = useCallback(
    (id) => {
      if (plan.includes(id)) return "exists";
      if (plan.length >= PLAN_LIMIT) return "full";
      setPlan((p) => [...p, id]);
      return "added";
    },
    [plan]
  );

  const saveForLater = useCallback(
    (id) => {
      if (saved.includes(id)) return "exists";
      setSaved((s) => [...s, id]);
      return "added";
    },
    [saved]
  );

  const removeFromPlan = useCallback((id) => {
    setPlan((p) => p.filter((x) => x !== id));
    setDone((d) => d.filter((x) => x !== id));
  }, []);

  const removeFromSaved = useCallback((id) => {
    setSaved((s) => s.filter((x) => x !== id));
  }, []);

  const toggleDone = useCallback(
    (id) => {
      const isDone = done.includes(id);
      setDone((d) => (isDone ? d.filter((x) => x !== id) : [...d, id]));
      return !isDone;
    },
    [done]
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      ready,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    }),
    [plan, saved, done, ready, addToPlan, saveForLater, removeFromPlan, removeFromSaved, toggleDone]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
