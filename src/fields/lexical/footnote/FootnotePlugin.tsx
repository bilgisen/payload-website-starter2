"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes } from "lexical"
import { useEffect } from "react"
import { FootnoteNode, $createFootnoteNode } from "./FootnoteNode"

export function FootnotePlugin(): null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([FootnoteNode])) {
      throw new Error("FootnotePlugin: FootnoteNode not registered on editor")
    }
  }, [editor])

  return null
}

export function insertFootnote(editor: any, footnoteText: string): void {
  editor.update(() => {
    const footnoteNode = $createFootnoteNode(footnoteText)
    $insertNodes([footnoteNode])
  })
}
