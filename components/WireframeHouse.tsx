/**
 * Maison isométrique en fil de fer holographique.
 * Chaque trait se dessine au chargement (stroke-dashoffset),
 * les lignes cachées apparaissent en pointillés, façon plan d'architecte.
 */

const STROKE = "url(#wfGrad)"

type LineProps = {
  d: string
  delay?: number
  width?: number
  fill?: string
}

function Draw({ d, delay = 0, width = 1.4, fill = "none" }: LineProps) {
  return (
    <path
      d={d}
      pathLength={1}
      className="draw"
      style={{ animationDelay: `${delay}s` }}
      stroke={STROKE}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
    />
  )
}

function Hidden({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <path
      d={d}
      className="appear"
      style={{ animationDelay: `${delay}s` }}
      stroke="#38E1FF"
      strokeOpacity={0.3}
      strokeWidth={1}
      strokeDasharray="5 6"
      fill="none"
    />
  )
}

function Cross({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g
      className="appear"
      style={{ animationDelay: `${delay}s` }}
      stroke="#7EF0FF"
      strokeWidth={1.2}
      opacity={0.85}
    >
      <path d={`M${x - 6} ${y} L${x + 6} ${y}`} />
      <path d={`M${x} ${y - 6} L${x} ${y + 6}`} />
    </g>
  )
}

export function WireframeHouse() {
  return (
    <div className="relative animate-float">
      <svg
        viewBox="0 0 560 520"
        fill="none"
        className="h-auto w-full [filter:drop-shadow(0_0_18px_rgba(56,225,255,0.25))]"
        role="img"
        aria-label="Plan 3D filaire d'une maison — visualisation de projet"
      >
        <defs>
          <linearGradient id="wfGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7EF0FF" />
            <stop offset="55%" stopColor="#38E1FF" />
            <stop offset="100%" stopColor="#19B8DD" />
          </linearGradient>
        </defs>

        {/* Orbite décorative */}
        <ellipse
          cx="280"
          cy="360"
          rx="238"
          ry="106"
          stroke="#38E1FF"
          strokeOpacity="0.14"
          strokeDasharray="2 7"
          className="animate-flicker"
        />

        {/* Plateforme au sol */}
        <g className="appear" style={{ animationDelay: "0.1s" }}>
          <path
            d="M280 470 L520 360 L280 250 L40 360 Z"
            stroke="#38E1FF"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <g stroke="#38E1FF" strokeOpacity="0.09" strokeWidth="1">
            <path d="M119 396 L359 286" />
            <path d="M198 433 L438 323" />
            <path d="M201 286 L441 396" />
            <path d="M122 323 L362 433" />
          </g>
        </g>

        {/* Arêtes cachées (pointillés) */}
        <Hidden d="M440 356 L280 282 L120 356" delay={1.8} />
        <Hidden d="M280 282 L280 162" delay={1.9} />
        <Hidden d="M440 236 L280 162 L120 236" delay={2.0} />
        <Hidden d="M280 162 L360 129" delay={2.1} />

        {/* Murs */}
        <Draw
          d="M280 430 L440 356 L440 236 L280 310 Z"
          delay={0.2}
          fill="rgba(56,225,255,0.04)"
        />
        <Draw
          d="M280 430 L120 356 L120 236 L280 310 Z"
          delay={0.35}
          fill="rgba(56,225,255,0.02)"
        />

        {/* Toit */}
        <Draw
          d="M280 310 L440 236 L360 129 L200 203 Z"
          delay={0.7}
          fill="rgba(56,225,255,0.05)"
        />
        <Draw d="M280 310 L120 236 L200 203 Z" delay={0.9} />

        {/* Porte */}
        <Draw d="M309 417 L309 359 L341 344 L341 402" delay={1.3} width={1.2} />
        <circle
          cx="336"
          cy="378"
          r="1.6"
          fill="#7EF0FF"
          className="appear"
          style={{ animationDelay: "1.6s" }}
        />

        {/* Fenêtre — façade droite */}
        <Draw d="M368 355 L416 333 L416 287 L368 309 Z" delay={1.45} width={1.2} />
        <Draw d="M392 344 L392 298" delay={1.6} width={0.9} />
        <Draw d="M368 332 L416 310" delay={1.65} width={0.9} />

        {/* Fenêtre — façade gauche */}
        <Draw d="M200 359 L149 335 L149 289 L200 313 Z" delay={1.55} width={1.2} />
        <Draw d="M175 347 L175 301" delay={1.7} width={0.9} />

        {/* Cotes — largeur façade */}
        <g className="appear" style={{ animationDelay: "2.2s" }}>
          <path
            d="M288 446 L448 372"
            stroke="#9FB4C8"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          <path d="M286 441 L290 451" stroke="#9FB4C8" strokeOpacity="0.55" strokeWidth="1" />
          <path d="M446 367 L450 377" stroke="#9FB4C8" strokeOpacity="0.55" strokeWidth="1" />
          <text
            x="386"
            y="428"
            className="font-mono"
            fontSize="11"
            letterSpacing="0.1em"
            fill="#9FB4C8"
          >
            8.40 m
          </text>
        </g>

        {/* Cotes — hauteur */}
        <g className="appear" style={{ animationDelay: "2.35s" }}>
          <path d="M96 356 L96 236" stroke="#9FB4C8" strokeOpacity="0.55" strokeWidth="1" />
          <path d="M92 356 L100 356" stroke="#9FB4C8" strokeOpacity="0.55" strokeWidth="1" />
          <path d="M92 236 L100 236" stroke="#9FB4C8" strokeOpacity="0.55" strokeWidth="1" />
          <text
            x="88"
            y="300"
            textAnchor="end"
            className="font-mono"
            fontSize="11"
            letterSpacing="0.1em"
            fill="#9FB4C8"
          >
            6.20 m
          </text>
        </g>

        {/* Repères de visée */}
        <Cross x={280} y={430} delay={2.4} />
        <Cross x={360} y={129} delay={2.5} />
        <Cross x={120} y={236} delay={2.6} />
      </svg>

      {/* Étiquettes flottantes */}
      <div
        className="chip appear absolute -right-2 top-[12%] shadow-glow sm:right-0"
        style={{ animationDelay: "2.7s" }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-holo animate-pulse-soft" />
        Permis // accordé
      </div>
      <div
        className="chip appear absolute -left-2 top-[48%] sm:left-0"
        style={{ animationDelay: "2.9s" }}
      >
        RE2020 ✓
      </div>
      <div
        className="chip appear absolute bottom-[8%] right-[6%]"
        style={{ animationDelay: "3.1s" }}
      >
        Structure // validée
      </div>
    </div>
  )
}
