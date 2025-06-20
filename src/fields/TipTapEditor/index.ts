import type { Field } from "payload/types"
import { TipTapField } from "./TipTapField"

export const tiptapField = (options: {
  name: string
  label?: string
  required?: boolean
}): Field => ({
  name: options.name,
  type: "text", // Store as HTML string
  admin: {
    components: {
      Field: (props) => <TipTapField {...props} label={options.label} required={options.required} />,
    },
  },
  validate: options.required
    ? (value) => {
        if (!value || value.trim() === "") {
          return "This field is required"
        }
        return true
      }
    : undefined,
})
