import type React from "react"
import "./globals.css"
import { Outfit, Source_Sans_3 } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata = {
  title: "Pramod Chavhan — Data Scientist | GenAI & ML Engineer",
  description:
    "Portfolio of Pramod Chavhan — Data Scientist & GenAI/ML Engineer building production RAG, LLM, and ML systems.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(outfit.variable, sourceSans.variable, "font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
