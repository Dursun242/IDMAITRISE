/**
 * Logo id Maîtrise — ampoule rayonnante, recréée en vectoriel
 * d'après le logo officiel haute résolution : culot à dôme et bagues
 * détourées, verre sphérique, filament-ruban déchiré, douze rayons.
 * currentColor permet l'usage sur fonds clairs et sombres.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      className={className}
      role="img"
      aria-label="Logo id Maîtrise"
    >
      {/* Culot : dôme + bagues détourées + collerette */}
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M43 11 A5 4.5 0 0 1 53 11" />
        <rect x="41" y="13" width="14" height="4.6" rx="2.3" strokeLinejoin="round" />
        <rect x="40" y="18.6" width="16" height="4.6" rx="2.3" strokeLinejoin="round" />
        <path d="M41 23.4 L39.4 27.4" />
        <path d="M55 23.4 L56.6 27.4" />
      </g>

      {/* Verre */}
      <path
        d="M39.4 27.4 C36.6 32.4 33 36.5 30.5 42 C29.2 45 28.5 48 28.5 51 C28.5 62 37 70.5 48 70.5 C59 70.5 67.5 62 67.5 51 C67.5 48 66.8 45 65.5 42 C63 36.5 59.4 32.4 56.6 27.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Filament-ruban déchiré */}
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M43.5 28 C43 33 42 37 41 40.5" />
        <path d="M48 28 C47.6 31.5 47 34.5 46.3 37.5" />
        <path d="M52.5 28 C52.8 32 53 35 53.5 38" />
        <path d="M41 40.5 L45 37.5 L45.8 43.5 L48.3 38.2 L49.5 41.8 L51.2 37.8 L53.5 38" />
      </g>

      {/* Rayons */}
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M29.6 32.6 L23.3 26.3" />
        <path d="M23.9 41.3 L15.6 37.9" />
        <path d="M22 51 L13 51" />
        <path d="M23.9 60.8 L15.6 64.1" />
        <path d="M29.6 69.4 L23.3 75.7" />
        <path d="M37.9 74.9 L34.4 83.2" />
        <path d="M48 77 L48 86" />
        <path d="M58.1 74.9 L61.6 83.2" />
        <path d="M66.4 69.4 L72.7 75.7" />
        <path d="M72.1 60.8 L80.4 64.1" />
        <path d="M74 51 L83 51" />
        <path d="M66.4 32.6 L72.7 26.3" />
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
        className={`h-11 w-11 shrink-0 ${light ? "text-linen" : "text-noir"}`}
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
