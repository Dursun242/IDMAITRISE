"use client"

import { useState } from "react"

type Status = "idle" | "sending" | "ok" | "error"

// Doit rester aligné avec la limite côté API (route.ts).
const MAX_TOTAL_BYTES = 4 * 1024 * 1024 // 4 Mo

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [startedAt] = useState(() => Date.now())
  const [fileError, setFileError] = useState<string | null>(null)

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const total = files.reduce((sum, f) => sum + f.size, 0)
    if (total > MAX_TOTAL_BYTES) {
      setFileError("Pièce(s) jointe(s) trop volumineuse(s) : 4 Mo maximum au total.")
      e.target.value = ""
    } else {
      setFileError(null)
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (fileError) return
    setStatus("sending")
    const form = e.currentTarget
    // FormData (multipart) pour porter d'éventuelles pièces jointes.
    const data = new FormData(form)
    // anti-spam : temps de remplissage (un bot soumet instantanément)
    data.append("_elapsed", String(Date.now() - startedAt))
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data, // pas de Content-Type manuel : le navigateur gère le boundary
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
      {/* Honeypot anti-spam : invisible pour les humains, rempli par les bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Ne pas remplir</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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

      {/* Pièce jointe (plan, photo, PDF…) */}
      <div className="rounded-xl border border-dashed border-ink/20 bg-paper p-4">
        <label
          htmlFor="attachments"
          className="text-xs font-medium uppercase tracking-[0.14em] text-ink/45"
        >
          Pièce jointe <span className="normal-case tracking-normal text-ink/35">(plan, photo, PDF — facultatif)</span>
        </label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept="application/pdf,image/jpeg,image/png,image/webp,image/heic,image/heif"
          onChange={onFileChange}
          className="mt-3 block w-full text-sm text-ink/70 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-medium file:text-paper hover:file:bg-ink-soft"
        />
        <p className="mt-2 text-xs text-ink/45">
          PDF ou image (JPG, PNG). 4 Mo maximum au total.
        </p>
        {fileError && (
          <p className="mt-2 text-xs font-medium text-ember-deep">{fileError}</p>
        )}
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
