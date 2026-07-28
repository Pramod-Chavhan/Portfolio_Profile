"use client"

import Link from "next/link"
import { profile } from "@/data/profile"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-pro flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="#home" className="font-display text-lg font-semibold">
          <span className="text-slate-100">Pramod</span>
          <span className="text-teal-400">.</span>
        </Link>
        <p className="text-xs text-slate-500 text-center">
          © {year} {profile.name} · {profile.title}
        </p>
        <p className="text-xs text-slate-600">Built with precision</p>
      </div>
    </footer>
  )
}
