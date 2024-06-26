import { CollectionConfig } from "payload/types";

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
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
    },
  ],
};

export default Articles;
