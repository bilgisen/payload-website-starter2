import type { CollectionConfig } from "payload/types"
import { FootnoteNode } from "../fields/lexical/footnote/FootnoteNode"
import { FootnotePlugin } from "../fields/lexical/footnote/FootnotePlugin"
import { FootnoteButton } from "../fields/lexical/footnote/FootnoteButton"

export const Posts: CollectionConfig = {
  slug: "posts",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      editor: {
        type: "lexical",
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          {
            feature: () => ({
              plugins: [FootnotePlugin],
              nodes: [FootnoteNode],
              toolbarInline: {
                sections: [
                  {
                    entries: [
                      {
                        component: FootnoteButton,
                        key: "footnote",
                      },
                    ],
                  },
                ],
              },
            }),
          },
        ],
      },
    },
  ],
}
