import React, { useEffect } from "react";
import { useField } from "payload/components/forms";
import { TextInput } from "payload/components/forms";

const TitleWithSlug: React.FC = () => {
  const { value: title, setValue: setTitle } = useField<string>({
    path: "title",
  });

  const { value: slug, setValue: setSlug } = useField<string>({
    path: "slug",
  });

  useEffect(() => {
    const generatedSlug = title
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    setSlug(generatedSlug || "");
  }, [title, setSlug]);

  return (
    <div>
      <TextInput
        path="title"
        name="title"
        label="Title"
        value={title || ""}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default TitleWithSlug;
