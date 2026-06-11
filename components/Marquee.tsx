type Props = {
  items: string[]
  className?: string
}

export function Marquee({ items, className = "" }: Props) {
  const doubled = [...items, ...items]
  return (
    <div
      className={`relative overflow-hidden border-y border-holo/10 bg-white/[0.02] py-4 ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
      <div className="marquee flex items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm font-medium uppercase tracking-[0.3em] text-ghost-dim"
          >
            {item}
            <span className="text-holo [text-shadow:0_0_12px_rgba(56,225,255,0.8)]">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
