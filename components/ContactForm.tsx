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
    "absolute left-4 top-3 text-xs font-medium uppercase tracking-[0.14em] text-ink/45 transition-colors group-focus-within:text-ember"
  const field =
    "w-full rounded-xl border border-ink/15 bg-paper px-4 pb-3 pt-8 text-sm text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-ember/20"

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
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition hover:bg-ink-soft disabled:opacity-60"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          <span className="arrow-out">→</span>
        </button>
        <p className="text-xs text-ink/45">Réponse sous 24–48 h ouvrées.</p>
      </div>

      {status === "ok" && (
        <div className="rounded-xl border border-sage/30 bg-sage/10 p-4 text-sm text-sage-deep">
          ✓ Votre message est bien parti. On vous recontacte rapidement.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl border border-ember/30 bg-ember/10 p-4 text-sm text-ember-deep">
          L'envoi a échoué. Appelez-nous directement, c'est plus rapide.
        </div>
      )}
    </form>
  )
}
