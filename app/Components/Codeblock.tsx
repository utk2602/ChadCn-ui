
// components/CodeBlock.tsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ borderRadius: "0.5rem", padding: "1rem", fontSize: "0.875rem" }}
      wrapLongLines
    >
      {code}
    </SyntaxHighlighter>
  )
}