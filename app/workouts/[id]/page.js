import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getWorkout } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id).catch(() => null);
  return { title: workout ? `${workout.name} — FitLog` : "Workout not found — FitLog" };
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id).catch(() => null);

  if (!workout) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="container-x py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
      >
        <ArrowLeft size={16} /> Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: media */}
        <div className="overflow-hidden rounded-2xl border border-line bg-surface lg:sticky lg:top-24 lg:self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt={workout.name}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        {/* Right: info */}
        <div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups?.map((m) => (
              <span key={m} className="tag">
                {m}
              </span>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
            <h2 className="border-b border-line px-5 py-3 font-display text-sm uppercase tracking-widest text-accent">
              Key Specs
            </h2>
            <dl>
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-line px-5 py-3 last:border-b-0"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6">
            <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-accent">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions?.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
