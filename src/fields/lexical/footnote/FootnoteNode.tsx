import { DecoratorNode, type NodeKey, type LexicalNode, type SerializedLexicalNode, type Spread } from "lexical"
import type { ReactNode } from "react"

export interface FootnotePayload {
  text: string
  id: string
}

export type SerializedFootnoteNode = Spread<
  {
    footnotePayload: FootnotePayload
  },
  SerializedLexicalNode
>

export class FootnoteNode extends DecoratorNode<ReactNode> {
  __footnotePayload: FootnotePayload

  static getType(): string {
    return "footnote"
  }

  static clone(node: FootnoteNode): FootnoteNode {
    return new FootnoteNode(node.__footnotePayload, node.__key)
  }

  constructor(footnotePayload: FootnotePayload, key?: NodeKey) {
    super(key)
    this.__footnotePayload = footnotePayload
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span")
    span.className = "footnote-reference"
    return span
  }

  updateDOM(): false {
    return false
  }

  static importJSON(serializedNode: SerializedFootnoteNode): FootnoteNode {
    const { footnotePayload } = serializedNode
    return $createFootnoteNode(footnotePayload.text, footnotePayload.id)
  }

  exportJSON(): SerializedFootnoteNode {
    return {
      footnotePayload: this.__footnotePayload,
      type: "footnote",
      version: 1,
    }
  }

  getTextContent(): string {
    return `[${this.__footnotePayload.id}]`
  }

  decorate(): ReactNode {
    return (
      <span
        className="footnote-reference"
        title={this.__footnotePayload.text}
        style={{
          backgroundColor: "#e3f2fd",
          padding: "2px 4px",
          borderRadius: "3px",
          cursor: "help",
          fontSize: "0.8em",
          verticalAlign: "super",
        }}
      >
        [{this.__footnotePayload.id}]
      </span>
    )
  }
}

export function $createFootnoteNode(text: string, id?: string): FootnoteNode {
  const footnoteId = id || Math.random().toString(36).substr(2, 9)
  return new FootnoteNode({ text, id: footnoteId })
}

export function $isFootnoteNode(node: LexicalNode | null | undefined): node is FootnoteNode {
  return node instanceof FootnoteNode
}
