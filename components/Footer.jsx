export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-[#0b0d10]">
      <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={20} height={20} className="h-5 w-5" />
          <span className="font-display text-base font-bold tracking-wide text-white">FITLOG</span>
        </div>
        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
