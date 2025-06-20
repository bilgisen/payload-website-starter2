"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useState } from "react"
import { insertFootnote } from "./FootnotePlugin"

export function FootnoteButton(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [showModal, setShowModal] = useState(false)
  const [footnoteText, setFootnoteText] = useState("")

  const handleInsertFootnote = () => {
    if (footnoteText.trim()) {
      insertFootnote(editor, footnoteText.trim())
      setFootnoteText("")
      setShowModal(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="toolbar-button"
        onClick={() => setShowModal(true)}
        title="Insert Footnote"
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Fn
      </button>

      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Add Footnote</h3>
            <textarea
              value={footnoteText}
              onChange={(e) => setFootnoteText(e.target.value)}
              placeholder="Enter footnote text..."
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleInsertFootnote}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  background: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
