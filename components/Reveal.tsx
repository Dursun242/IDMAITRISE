"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  children: React.ReactNode
  /** délai en ms avant l'apparition (pour décaler les éléments d'une grille) */
  delay?: number
  className?: string
  as?: "div" | "section" | "li" | "article"
}

/**
 * Révèle son contenu (fondu + léger glissement) quand il entre dans le viewport.
 * Respecte prefers-reduced-motion et reste visible si JS échoue (SSR).
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const Tag = as as React.ElementType
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-shown={shown}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`motion-safe:translate-y-6 motion-safe:opacity-0 motion-safe:transition-all motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] data-[shown=true]:motion-safe:translate-y-0 data-[shown=true]:motion-safe:opacity-100 ${className}`}
    >
      {children}
    </Tag>
  )
}
