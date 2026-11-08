"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isActive = (href) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/workouts") : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-x relative flex flex-wrap items-center justify-between gap-y-2 py-3 md:h-16 md:flex-nowrap md:py-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="FitLog logo" width={28} height={28} className="h-7 w-7" />
          <span className="font-display text-xl font-bold tracking-wide text-white">
            FIT<span className="text-accent">LOG</span>
          </span>
        </Link>

        {/* Center links */}
        <nav className="order-3 flex w-full items-center justify-center gap-2 md:absolute md:left-1/2 md:order-none md:w-auto md:-translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-4 py-1.5 font-display text-sm uppercase tracking-wider transition ${
                isActive(link.href)
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right badges */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            aria-label="Today's plan count"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-bg transition hover:brightness-110"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            aria-label="Saved count"
            className="rounded-full border border-accent/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent transition hover:bg-accent/10"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}
