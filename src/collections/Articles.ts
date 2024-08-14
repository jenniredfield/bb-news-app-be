import { CollectionConfig } from "payload/types";
import { slugField } from "../fields/slug";
import TitleWithSlug from "../_components/titleWithSlug";

const Articles: CollectionConfig = {
  slug: "articles",
  auth: false,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      admin: {
        components: {
          Field: TitleWithSlug,
        },
      },
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "author",
      label: "Author",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
    // {
    //   name: "publishedAt",
    //   label: "Published At",
    //   type: "dateTime",
    //   required: true,
    // },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "upload",
      relationTo: "images",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "tags",
      label: "Tags",
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    slugField(),
  ],
};

export default Articles;
