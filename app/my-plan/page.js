"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ChevronDown, Clock, Dumbbell, Flame } from "lucide-react";
import { PLAN_LIMIT, usePlan } from "@/context/PlanContext";
import PlanCard from "@/components/PlanCard";
import Spinner from "@/components/Spinner";

const SORTERS = {
  Duration: (a, b) => a.duration - b.duration,
  Calories: (a, b) => b.caloriesBurned - a.caloriesBurned,
  Rating: (a, b) => b.rating - a.rating,
};

export default function MyPlanPage() {
  const { plan, saved, done, ready, addToPlan, removeFromPlan, removeFromSaved, toggleDone } =
    usePlan();

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("Duration");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/workouts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your workouts. Please refresh the page.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const byId = useMemo(() => Object.fromEntries(workouts.map((w) => [w.id, w])), [workouts]);

  const planItems = useMemo(() => plan.map((id) => byId[id]).filter(Boolean), [plan, byId]);
  const savedItems = useMemo(() => saved.map((id) => byId[id]).filter(Boolean), [saved, byId]);

  const items = useMemo(() => {
    const list = tab === "plan" ? planItems : savedItems;
    return [...list].sort(SORTERS[sortBy]);
  }, [tab, planItems, savedItems, sortBy]);

  const totals = useMemo(
    () => ({
      exercises: planItems.length,
      minutes: planItems.reduce((sum, w) => sum + w.duration, 0),
      calories: planItems.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [planItems]
  );

  const handleDone = (w) => {
    const nowDone = toggleDone(w.id);
    if (nowDone) toast.success(`${w.name} marked as done`);
    else toast(`${w.name} marked as not done`, { icon: "↩️" });
  };

  const handleRemove = (w) => {
    if (tab === "plan") removeFromPlan(w.id);
    else removeFromSaved(w.id);
    toast.success(`${w.name} removed`);
  };

  const handleAddFromSaved = (w) => {
    const result = addToPlan(w.id);
    if (result === "added") toast.success("Added to today's plan");
    else if (result === "exists") toast("Already in today's plan", { icon: "ℹ️" });
    else toast.error(`Plan is full — max ${PLAN_LIMIT} lifts per day`);
  };

  const metrics = [
    { label: "Exercises", value: totals.exercises, icon: Dumbbell },
    { label: "Minutes", value: totals.minutes, icon: Clock },
    { label: "Calories", value: totals.calories, icon: Flame },
  ];

  const tabs = [
    { key: "plan", label: "Today's Plan", count: plan.length },
    { key: "saved", label: "Saved", count: saved.length },
  ];

  const isLoading = loading || !ready;

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">MY PLAN</h1>
      <p className="mt-1 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      {/* Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl border border-line bg-surface p-5"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
              <p className="mt-1 font-display text-4xl font-bold text-accent">{value}</p>
            </div>
            <Icon size={28} className="text-muted" />
          </div>
        ))}
      </div>

      {/* Tabs + sort */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl border border-line bg-surface p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-2 font-display text-sm uppercase tracking-wider transition ${
                tab === t.key ? "bg-accent text-bg" : "text-muted hover:text-white"
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        <label className="relative inline-flex items-center gap-2 text-sm text-muted">
          <span className="font-semibold uppercase tracking-wider text-xs">Sort By</span>
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-line bg-surface py-2 pl-3 pr-9 text-sm text-white focus:border-accent focus:outline-none"
            >
              {Object.keys(SORTERS).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />
          </span>
        </label>
      </div>

      {/* List */}
      <section className="mt-6">
        {isLoading ? (
          <Spinner label="Loading workouts…" />
        ) : error ? (
          <p className="rounded-2xl border border-line bg-surface p-10 text-center text-muted">{error}</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-white">NOTHING HERE YET</h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/" className="btn-primary mt-6">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((w) => (
              <PlanCard
                key={w.id}
                workout={w}
                tab={tab}
                isDone={done.includes(w.id)}
                planFull={plan.length >= PLAN_LIMIT}
                onDone={() => handleDone(w)}
                onRemove={() => handleRemove(w)}
                onAddToPlan={() => handleAddFromSaved(w)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
