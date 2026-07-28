"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeSnippetProps {
  code: string
  language: string
  title?: string
  description?: string
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to legacy path
  }

  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "fixed"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

export default function CodeSnippet({ code, language, title, description }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    const ok = await copyText(code)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightSyntax = (source: string, lang: string) => {
    if (lang === "python") {
      return source
        .replace(
          /(def|class|import|from|if|else|elif|for|while|return|True|False|None|and|or|not|in|is|lambda|try|except|finally|with|as|assert|break|continue|global|pass|raise|yield)\b/g,
          '<span class="text-teal-400">$1</span>',
        )
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-amber-300">$&</span>')
        .replace(/(#.*)$/gm, '<span class="text-gray-500">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-sky-400">$1</span>')
    }
    if (lang === "javascript" || lang === "typescript") {
      return source
        .replace(
          /(const|let|var|function|class|import|export|from|if|else|for|while|return|true|false|null|undefined|this|new|async|await|try|catch|finally|throw|typeof|instanceof)\b/g,
          '<span class="text-teal-400">$1</span>',
        )
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-amber-300">$&</span>')
        .replace(/(\/\/.*)$/gm, '<span class="text-gray-500">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-sky-400">$1</span>')
    }
    return source
  }

  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl">
      {(title || description) && (
        <div className="bg-muted/50 p-4 border-b border-border">
          {title && <h3 className="font-medium text-lg">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}

      <div className="relative">
        <div className="absolute top-2 right-2 bg-primary/20 text-primary-foreground text-xs px-2 py-1 rounded-md">
          {language}
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-16 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={copyToClipboard}
          type="button"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>

        <pre className="p-4 overflow-x-auto text-sm">
          <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }} />
        </pre>
      </div>
    </Card>
  )
}
