type Props = {
  items: string[]
  className?: string
}

export function Marquee({ items, className = "" }: Props) {
  const doubled = [...items, ...items]
  return (
    <div
      className={`relative overflow-hidden border-y border-ink/10 bg-paper-warm py-5 ${className}`}
    >
      <div className="marquee flex items-center gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 font-display text-2xl font-medium tracking-tight text-ink/80 sm:text-3xl"
          >
            {item}
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
