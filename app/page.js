"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import Spinner from "@/components/Spinner";
import WorkoutCard from "@/components/WorkoutCard";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetch("/api/workouts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load workouts");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load workouts. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups?.some((m) => m.toLowerCase().includes(q))
    );
  }, [workouts, query]);

  return (
    <>
      <Hero />

      <section id="library" className="container-x scroll-mt-20 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
              THE LIBRARY
            </h2>
            <p className="mt-1 text-muted">Twelve lifts covering every major muscle group.</p>
          </div>

          <label className="relative block w-full sm:w-72">
            <span className="sr-only">Search workouts</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or muscle"
              className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </label>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center">
            <p className="text-muted">{error}</p>
            <button onClick={() => setAttempt((a) => a + 1)} className="btn-primary mt-5">
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-muted">No workouts match &quot;{query}&quot;.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
