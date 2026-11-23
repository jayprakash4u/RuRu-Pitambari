type CategoryIconProps = {
  name: "floor" | "home" | "kitchen" | "metal" | "pooja";
};

export function CategoryIcon({ name }: CategoryIconProps) {
  const commonProps = {
    "aria-hidden": true,
    fill: "none",
    viewBox: "0 0 80 80",
  } as const;

  if (name === "metal") {
    return (
      <svg {...commonProps}>
        <path d="M19 47h42c-1.2 9.3-8.6 15-21 15s-19.8-5.7-21-15Z" />
        <path d="M23 47c.5-8 6.9-13 17-13s16.5 5 17 13M30 34c1-6.2 4.3-10 10-10s9 3.8 10 10" />
        <path d="M33 24c.5-3.8 2.8-6 7-6s6.5 2.2 7 6M17 43h46" />
        <path
          className="accent"
          d="m58 20 1.7 4.3L64 26l-4.3 1.7L58 32l-1.7-4.3L52 26l4.3-1.7L58 20Z"
        />
      </svg>
    );
  }

  if (name === "kitchen") {
    return (
      <svg {...commonProps}>
        <path d="M25 30h25l5 8v25H22V36c0-3.3 1.7-6 3-6Z" />
        <path d="M29 30v-7h12l5 7M22 42h33M28 48h21M28 54h21M31 63v-7M46 63v-7" />
        <path d="M52 19h9M57 19v7M61 26h-8" />
        <path className="accent" d="m59 38 1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6 1.6-4Z" />
      </svg>
    );
  }

  if (name === "floor") {
    return (
      <svg {...commonProps}>
        <path d="m49 16-9 27M46 25l8 3M36 43h11l5 21H27l5-21h4" />
        <path d="M29 52h21M31 58h18M20 64h40" />
        <path className="accent" d="M18 43c4-5.5 8-5.5 12 0-4 5.5-8 5.5-12 0Z" />
        <path className="accent" d="M54 39c3-4 6-4 9 0-3 4-6 4-9 0Z" />
      </svg>
    );
  }

  if (name === "pooja") {
    return (
      <svg {...commonProps}>
        <path d="M18 54h44M23 54c1-7 6.7-11 17-11s16 4 17 11" />
        <path d="M28 43h24M34 43V29h12v14M37 29c0-4 1-7 3-10 2 3 3 6 3 10" />
        <path d="M20 23v20M16 23h8M18 18h4M58 28v15M55 28h6" />
        <path className="accent" d="M40 19c-5 6-5 10 0 12 5-2 5-6 0-12Z" />
        <path d="M25 59h30" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="m14 38 26-22 26 22M20 34v30h40V34M31 64V46h18v18" />
      <path d="M26 25v-7h9" />
      <path className="accent" d="M40 40c-7-8-16 3-7 10l7 6 7-6c9-7 0-18-7-10Z" />
      <path d="m59 17 1.3 3.7L64 22l-3.7 1.3L59 27l-1.3-3.7L54 22l3.7-1.3L59 17Z" />
    </svg>
  );
}
