import Link from "next/link";

export const metadata = { title: "Page not found — FitLog" };

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl font-bold text-accent sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-white">
        Rep not found
      </h1>
      <p className="mt-2 max-w-md text-muted">
        The page you are looking for doesn&apos;t exist or was moved. Let&apos;s get you back to the
        gym floor.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to workouts
      </Link>
    </div>
  );
}
