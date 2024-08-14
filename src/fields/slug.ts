import { Field } from "payload/types";
import formatSlug from "../utilities/formatSlug";

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = "title") =>
  <Field>{
    name: "slug",
    label: "Slug",
    type: "text",
    index: true,
    admin: {
      position: "sidebar",
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
  };
