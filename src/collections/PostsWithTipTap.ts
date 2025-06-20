import type { CollectionConfig } from "payload/types"
import { tiptapField } from "../fields/TipTapEditor"

export const PostsWithTipTap: CollectionConfig = {
  slug: "posts-tiptap",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    tiptapField({
      name: "content",
      label: "Content",
      required: true,
    }),
  ],
}
