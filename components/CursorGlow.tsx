"use client"

import { useEffect, useRef } from "react"

/**
 * Halo holographique qui suit le curseur (desktop uniquement).
 * Purement décoratif : pointer-events désactivés, blend "screen".
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 3
    let tx = cx
    let ty = cy

    const loop = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }

    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = "1"
      if (!raf) raf = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", move, { passive: true })
    return () => {
      window.removeEventListener("pointermove", move)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700 lg:block"
      style={{
        background:
          "radial-gradient(circle, rgba(56,225,255,0.08) 0%, rgba(56,225,255,0.025) 40%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  )
}
