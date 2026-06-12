/**
 * Logo id Maîtrise — ampoule rayonnante, recréée en vectoriel
 * d'après le logo officiel (net à toutes les tailles, couleur adaptable
 * via currentColor pour les fonds clairs et sombres).
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="Logo id Maîtrise"
    >
      {/* Culot */}
      <path
        d="M20.5 6 A3.5 3 0 0 1 27.5 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M19.5 8.5 H28.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 11 H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Verre */}
      <path
        d="M20.5 13 C18.5 15.5 15 19 15 23.5 C15 28.5 19 32.5 24 32.5 C29 32.5 33 28.5 33 23.5 C33 19 29.5 15.5 27.5 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Filament */}
      <path
        d="M21.5 13.5 L21.5 17 L23.5 21.5 L24 18 L24.5 21.5 L26.5 17 L26.5 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rayons */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M11.5 23.5 L7 23.5" />
        <path d="M36.5 23.5 L41 23.5" />
        <path d="M24 36 L24 40.5" />
        <path d="M14.8 31.5 L11.5 34.8" />
        <path d="M33.2 31.5 L36.5 34.8" />
        <path d="M13.5 14.5 L10.2 11.2" />
        <path d="M34.5 14.5 L37.8 11.2" />
      </g>
    </svg>
  )
}

/** Lockup complet : ampoule + « id Maîtrise » + signature. */
export function LogoLockup({
  tagline,
  light = false,
}: {
  tagline?: string
  light?: boolean
}) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark
        className={`h-10 w-10 shrink-0 ${light ? "text-linen" : "text-noir"}`}
      />
      <span className="flex flex-col">
        <span
          className={`whitespace-nowrap font-sans text-xl leading-none tracking-tight ${
            light ? "text-linen" : "text-noir"
          }`}
        >
          <span className="font-extrabold">id</span>{" "}
          <span className="font-medium">Maîtrise</span>
        </span>
        {tagline && (
          <span
            className={`mt-1.5 whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.16em] ${
              light ? "text-linen/55" : "text-noir-mute"
            }`}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  )
}
