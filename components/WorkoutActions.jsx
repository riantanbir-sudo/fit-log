"use client";

import toast from "react-hot-toast";
import { Bookmark, BookmarkCheck, CalendarPlus, CalendarCheck } from "lucide-react";
import { PLAN_LIMIT, usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }) {
  const { plan, saved, addToPlan, saveForLater } = usePlan();

  const inPlan = plan.includes(workout.id);
  const isSaved = saved.includes(workout.id);
  const planFull = plan.length >= PLAN_LIMIT && !inPlan;

  const handleAdd = () => {
    const result = addToPlan(workout.id);
    if (result === "added") toast.success("Added to today's plan");
    else if (result === "exists") toast("Already in today's plan", { icon: "ℹ️" });
    else toast.error(`Plan is full — max ${PLAN_LIMIT} lifts per day`);
  };

  const handleSave = () => {
    const result = saveForLater(workout.id);
    if (result === "added") toast.success("Saved for later");
    else toast("Already in your saved list", { icon: "ℹ️" });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button onClick={handleAdd} disabled={planFull || inPlan} className="btn-primary">
        {inPlan ? <CalendarCheck size={18} /> : <CalendarPlus size={18} />}
        {inPlan ? "In today's plan" : planFull ? "Plan is full" : "Add to today's plan"}
      </button>
      <button onClick={handleSave} disabled={isSaved} className="btn-secondary">
        {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
