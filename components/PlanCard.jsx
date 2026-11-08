"use client";

import Link from "next/link";
import { Check, CalendarPlus, X } from "lucide-react";
import Stats from "@/components/Stats";

export default function PlanCard({ workout, tab, isDone, onDone, onRemove, onAddToPlan, planFull }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-surface p-4 sm:flex-row sm:items-center ${
        isDone ? "border-accent/50" : "border-line"
      }`}
    >
      <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-surface2 sm:h-20 sm:w-36">

        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-xl font-semibold uppercase tracking-wide ${
            isDone ? "text-muted line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <Stats workout={workout} className="mt-2" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-white transition hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {tab === "plan" ? (
          <button
            onClick={onDone}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
              isDone
                ? "border border-accent text-accent"
                : "bg-accent text-bg hover:brightness-110"
            }`}
          >
            <Check size={14} /> {isDone ? "Done" : "Mark as Done"}
          </button>
        ) : (
          <button
            onClick={onAddToPlan}
            disabled={planFull}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CalendarPlus size={14} /> Add to Plan
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition hover:border-red-500 hover:text-red-500"
        >
          <X size={16} />
        </button>
      </div>
    </article>
  );
}
