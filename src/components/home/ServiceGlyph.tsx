/** Small abstract mark for each service: circles that stand for the people in the room. */
export function ServiceGlyph({ slug, className }: { slug: string; className?: string }) {
  const common = { viewBox: "0 0 64 64", className, "aria-hidden": true, fill: "none" } as const;
  switch (slug) {
    case "couples":
      return (
        <svg {...common}>
          <circle cx="25" cy="32" r="15" fill="var(--color-clay)" opacity=".85" />
          <circle cx="39" cy="32" r="15" fill="var(--color-ochre)" opacity=".75" />
        </svg>
      );
    case "teens":
      return (
        <svg {...common}>
          <path d="M32 54V30" stroke="var(--color-moss)" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 34c-10 0-16-7-16-16 10 0 16 7 16 16Z" fill="var(--color-moss)" />
          <path d="M32 30c0-9 6-16 16-16 0 9-6 16-16 16Z" fill="var(--color-sage)" />
        </svg>
      );
    case "family":
      return (
        <svg {...common}>
          <circle cx="20" cy="36" r="11" fill="var(--color-clay)" opacity=".85" />
          <circle cx="44" cy="36" r="11" fill="var(--color-moss)" opacity=".8" />
          <circle cx="32" cy="22" r="9" fill="var(--color-ochre)" opacity=".85" />
        </svg>
      );
    case "follow-up":
      return (
        <svg {...common}>
          <path d="M46 22a17 17 0 1 0 3 16" stroke="var(--color-clay-deep)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M47 12v11H36" stroke="var(--color-clay-deep)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="17" fill="var(--color-clay)" opacity=".85" />
          <circle cx="32" cy="32" r="24" stroke="var(--color-ochre)" strokeWidth="1.5" />
        </svg>
      );
  }
}
