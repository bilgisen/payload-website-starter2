"use client"

import type React from "react"
import { useCallback } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useField } from "payload/components/forms"

// Custom Footnote Extension
const FootnoteExtension = {
  name: "footnote",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
      text: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span[data-footnote]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        "data-footnote": "",
        "data-id": HTMLAttributes.id,
        "data-text": HTMLAttributes.text,
        class: "footnote-reference",
        title: HTMLAttributes.text,
      },
      `[${HTMLAttributes.id}]`,
    ]
  },

  addCommands() {
    return {
      insertFootnote:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          })
        },
    }
  },
}

interface TipTapFieldProps {
  path: string
  name: string
  label?: string
  required?: boolean
}

export const TipTapField: React.FC<TipTapFieldProps> = ({ path, name, label, required }) => {
  const { value, setValue } = useField<string>({ path })

  const editor = useEditor({
    extensions: [
      StarterKit,
      FootnoteExtension,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML())
    },
  })

  const addFootnote = useCallback(() => {
    if (!editor) return

    const footnoteText = prompt("Enter footnote text:")
    if (footnoteText) {
      const footnoteId = Math.random().toString(36).substr(2, 9)
      editor
        .chain()
        .focus()
        .insertFootnote({
          id: footnoteId,
          text: footnoteText,
        })
        .run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="tiptap-field">
      {label && (
        <label className="field-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div
        className="tiptap-toolbar"
        style={{
          borderBottom: "1px solid #e1e5e9",
          padding: "10px",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "3px" }}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "3px" }}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "3px" }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={addFootnote}
          style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "3px" }}
        >
          Footnote
        </button>
      </div>

      <EditorContent
        editor={editor}
        style={{
          border: "1px solid #e1e5e9",
          borderTop: "none",
          minHeight: "200px",
          padding: "15px",
        }}
      />

      <style jsx>{`
        .tiptap-field .ProseMirror {
          outline: none;
        }
        .tiptap-field .footnote-reference {
          background-color: #e3f2fd;
          padding: 2px 4px;
          border-radius: 3px;
          cursor: help;
          font-size: 0.8em;
          vertical-align: super;
        }
        .tiptap-field .is-active {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </div>
  )
}
