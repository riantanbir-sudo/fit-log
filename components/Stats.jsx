import { Clock, Flame, Star } from "lucide-react";

export default function Stats({ workout, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted ${className}`}>
      <span className="flex items-center gap-1.5">
        <Clock size={14} className="text-accent" /> {workout.duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame size={14} className="text-accent" /> {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star size={14} className="fill-accent text-accent" /> {workout.rating}
      </span>
    </div>
  );
}
