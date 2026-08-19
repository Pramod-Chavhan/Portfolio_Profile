import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Syne, DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import JsonLd from "@/components/json-ld"
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pramod Chavhan — Data Scientist | GenAI & ML Engineer",
    template: "%s · Pramod Chavhan",
  },
  description:
    "Portfolio of Pramod Chavhan — Data Scientist & GenAI/ML Engineer. Production RAG, LLMs, and ML systems. 3.6 years experience · Pune, India.",
  keywords: [
    "Pramod Chavhan",
    "Data Scientist",
    "GenAI",
    "Machine Learning",
    "RAG",
    "Portfolio",
  ],
  authors: [{ name: "Pramod Chavhan" }],
  creator: "Pramod Chavhan",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Pramod Chavhan Portfolio",
    title: "Pramod Chavhan — Data Scientist | GenAI & ML Engineer",
    description:
      "Production RAG, LLMs, and ML systems. 3.6 years experience · Pune, India.",
    images: [
      {
        url: "/og-image.png",
        width: 1376,
        height: 768,
        alt: "Pramod Chavhan — Data Scientist | GenAI & ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pramod Chavhan — Data Scientist | GenAI & ML Engineer",
    description:
      "Production RAG, LLMs, and ML systems. 3.6 years experience · Pune, India.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(syne.variable, dmSans.variable, "font-sans antialiased")}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <JsonLd />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
