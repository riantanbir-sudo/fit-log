import Link from "next/link";
import Stats from "@/components/Stats";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="h-48 overflow-hidden bg-surface2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups?.map((m) => (
            <span key={m} className="tag">
              {m}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <Stats workout={workout} className="mt-auto border-t border-line pt-3" />
      </div>
    </Link>
  );
}
