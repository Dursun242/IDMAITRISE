"use client"

import { useState } from "react"

type Status = "idle" | "sending" | "ok" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus("ok")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const fieldWrap = "group relative"
  const fieldLabel =
    "absolute left-4 top-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ghost-mute transition-colors group-focus-within:text-holo"
  const field =
    "w-full rounded-xl border border-holo/15 bg-void/60 px-4 pb-3 pt-8 text-sm text-ghost outline-none transition placeholder:text-ghost-mute/60 focus:border-holo/60 focus:shadow-glow"

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={fieldWrap}>
          <label htmlFor="name" className={fieldLabel}>
            Nom complet
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Jean Dupont"
            className={field}
          />
        </div>
        <div className={fieldWrap}>
          <label htmlFor="phone" className={fieldLabel}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="06 12 34 56 78"
            className={field}
          />
        </div>
      </div>

      <div className={fieldWrap}>
        <label htmlFor="email" className={fieldLabel}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jean@exemple.fr"
          className={field}
        />
      </div>

      <div className={fieldWrap}>
        <label htmlFor="message" className={fieldLabel}>
          Votre projet
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Construction, extension, rénovation, permis…"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-holo group disabled:opacity-60"
        >
          {status === "sending" ? "Transmission…" : "Transmettre ma demande"}
          <span className="arrow-out">→</span>
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ghost-mute">
          Réponse &lt; 24–48 h ouvrées
        </p>
      </div>

      {status === "ok" && (
        <div className="rounded-xl border border-holo/30 bg-holo/10 p-4 font-mono text-sm text-holo-soft">
          // Transmission reçue. On vous recontacte rapidement.
          <span className="caret ml-1 inline-block">▮</span>
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl border border-signal/40 bg-signal/10 p-4 font-mono text-sm text-signal">
          // Échec de l'envoi. Appelez-nous directement, c'est plus rapide.
        </div>
      )}
    </form>
  )
}
