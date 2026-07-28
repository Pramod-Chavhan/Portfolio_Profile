import type React from "react"
import "./globals.css"
import { Syne, DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata = {
  title: "Pramod Chavhan — Data Scientist | GenAI & ML Engineer",
  description:
    "Cinematic portfolio of Pramod Chavhan — production RAG, LLMs, and ML systems across Rutamsoft, Pipran Infotech, and Innodatastics.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(syne.variable, dmSans.variable, "font-sans antialiased")}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
