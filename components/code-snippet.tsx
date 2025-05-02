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

export default function CodeSnippet({ code, language, title, description }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Syntax highlighting (basic)
  const highlightSyntax = (code: string, language: string) => {
    if (language === "python") {
      // Basic Python syntax highlighting
      return code
        .replace(
          /(def|class|import|from|if|else|elif|for|while|return|True|False|None|and|or|not|in|is|lambda|try|except|finally|with|as|assert|break|continue|global|pass|raise|yield)\b/g,
          '<span class="text-purple-400">$1</span>',
        )
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-amber-300">$&</span>') // strings
        .replace(/(#.*)$/gm, '<span class="text-gray-500">$1</span>') // comments
        .replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>') // numbers
    } else if (language === "javascript" || language === "typescript") {
      // Basic JS/TS syntax highlighting
      return code
        .replace(
          /(const|let|var|function|class|import|export|from|if|else|for|while|return|true|false|null|undefined|this|new|async|await|try|catch|finally|throw|typeof|instanceof)\b/g,
          '<span class="text-purple-400">$1</span>',
        )
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-amber-300">$&</span>') // strings
        .replace(/(\/\/.*)$/gm, '<span class="text-gray-500">$1</span>') // single line comments
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>') // multi-line comments
        .replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>') // numbers
    } else {
      return code
    }
  }

  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl">
      {/* Header */}
      {(title || description) && (
        <div className="bg-muted/50 p-4 border-b border-border">
          {title && <h3 className="font-medium text-lg">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}

      {/* Code area */}
      <div className="relative">
        {/* Language badge */}
        <div className="absolute top-2 right-2 bg-primary/20 text-primary-foreground text-xs px-2 py-1 rounded-md">
          {language}
        </div>

        {/* Copy button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-16 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>

        {/* Code content */}
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }}></code>
        </pre>
      </div>
    </Card>
  )
}
