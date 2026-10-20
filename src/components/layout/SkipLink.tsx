export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="fixed left-4 top-3 z-50 -translate-y-24 rounded-full bg-forest px-5 py-3 text-cream shadow-warm transition-transform focus-visible:translate-y-0"
    >
      {label}
    </a>
  );
}
