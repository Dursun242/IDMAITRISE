type Props = {
  items: string[]
  className?: string
}

export function Marquee({ items, className = "" }: Props) {
  const doubled = [...items, ...items]
  return (
    <div
      className={`relative overflow-hidden border-y border-noir/10 bg-linen-warm py-5 ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-linen-warm to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-linen-warm to-transparent" />
      <div className="marquee flex items-center gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 font-display text-2xl font-medium tracking-tight text-noir/75 sm:text-3xl"
          >
            {item}
            <span className="text-bronze">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
