"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle } from "lucide-react"
import { profile } from "@/data/profile"
import Magnetic from "@/components/motion/magnetic"

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
    if (error) setError(null)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try email instead.")
      }

      setDone(true)
      setForm({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setDone(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section-pad border-t border-white/[0.04]">
      <div className="container-pro">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Contact</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-4">
              Let&apos;s build something sharp
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              {profile.availability}. Reach out for GenAI, ML engineering roles, or collaborations.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Phone className="h-4 w-4 text-sky-400 shrink-0" />
                {profile.phone}
              </a>
              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  WhatsApp me
                </a>
              )}
              <p className="flex items-center gap-3 text-slate-400">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                {profile.location}
              </p>
            </div>

            <div className="flex gap-2 mt-8">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-white/10 text-slate-400 hover:text-teal-300 hover:border-teal-400/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-white/10 text-slate-400 hover:text-teal-300 hover:border-teal-400/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 surface p-6 md:p-8"
          >
            {done ? (
              <div className="py-16 text-center">
                <p className="font-display text-2xl text-teal-300 mb-2">Message sent</p>
                <p className="text-slate-400 text-sm">I&apos;ll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" name="name" value={form.name} onChange={onChange} required />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={onChange} required />
                <div>
                  <label htmlFor="message" className="text-xs uppercase tracking-wider text-slate-500 mb-2 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={onChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-100 outline-none focus:border-teal-400/40 resize-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-400/90">
                    {error}{" "}
                    <a href={`mailto:${profile.email}`} className="underline hover:text-red-300">
                      Email directly
                    </a>
                  </p>
                )}
                <Magnetic>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 rounded-full gradient-btn px-6 py-3 text-sm disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {sending ? "Sending…" : "Send message"}
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-wider text-slate-500 mb-2 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-100 outline-none focus:border-teal-400/40"
      />
    </div>
  )
}
