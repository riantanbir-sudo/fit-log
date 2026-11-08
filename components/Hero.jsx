import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="container-x grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
      <div className="order-2 md:order-1">
        <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          WORKOUT LIBRARY
        </p>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          TRAIN WITH INTENT. <span className="text-accent">LOG EVERY SET.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
          and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn-primary mt-8">
          BROWSE WORKOUTS <ArrowDown size={18} />
        </a>
      </div>

      <div className="order-1 flex justify-center md:order-2 md:justify-end">
        <div className="relative w-full max-w-sm rounded-3xl border border-line bg-surface p-6 shadow-[0_0_80px_-20px_rgba(204,255,0,0.35)]">
          <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-accent/20 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/banner.png"
            alt="Muscle anatomy illustration on a preacher curl machine"
            className="relative mx-auto h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
