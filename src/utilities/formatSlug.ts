import { FieldHook } from "payload/types";

export const format = (val: string): string =>
  val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    if (typeof value === "string") {
      return format(value);
    }

    if (operation === "create") {
      const fallbackData =
        (data && data[fallback]) || (originalDoc && originalDoc[fallback]);

      if (fallbackData && typeof fallbackData === "string") {
        return format(fallbackData);
      }
    }
    return value;
  };

export default formatSlug;
