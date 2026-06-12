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
      {/* Culot : dôme + bagues évasées */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 6 A3 3 0 0 1 27 6" />
        <path d="M20 8.5 H28" />
        <path d="M19.5 11 H28.5" />
        <path d="M19 13.5 H29" />
      </g>

      {/* Verre */}
      <path
        d="M20 14 C17.5 17.5 14.5 20.5 14.5 25.5 C14.5 31 18.8 35.5 24 35.5 C29.2 35.5 33.5 31 33.5 25.5 C33.5 20.5 30.5 17.5 28 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Filament « brisé » */}
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.5 14 L20.6 20" />
        <path d="M26.5 14 L27.4 19.3" />
        <path d="M20.6 20 L23 18.4 L23.8 22.6 L25 18.8 L26 21.4 L27.4 19.3" />
      </g>

      {/* Rayons */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M15.2 16.7 L11.6 13.1" />
        <path d="M12.2 21.2 L7.6 19.6" />
        <path d="M11.5 25.5 L6.6 25.5" />
        <path d="M12.7 30.7 L8.4 32.6" />
        <path d="M16.9 35.6 L13.6 40.3" />
        <path d="M22.9 38 L22.5 43" />
        <path d="M28.2 37.2 L30.2 41.8" />
        <path d="M33.5 33.4 L37.3 36.5" />
        <path d="M36.3 23.4 L41.2 22.5" />
        <path d="M32.8 16.7 L36.4 13.1" />
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
