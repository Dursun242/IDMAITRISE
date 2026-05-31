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

  const field =
    "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-steel"

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Votre nom" className={field} />
        <input name="phone" placeholder="Téléphone" className={field} />
      </div>
      <input name="email" type="email" required placeholder="Email" className={field} />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Décrivez votre projet (construction, extension, rénovation, permis…)"
        className={field}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-steel px-6 py-3 font-medium text-paper transition hover:bg-steel-dark disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
      </button>
      {status === "ok" && (
        <p className="text-sm font-medium text-green-700">
          Merci, votre message est bien parti. Réponse sous 24–48 h ouvrées.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-700">
          L'envoi a échoué. Appelez-nous directement, c'est plus rapide.
        </p>
      )}
    </form>
  )
}
