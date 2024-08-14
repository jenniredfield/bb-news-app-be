import React, { useEffect } from "react";
import { useField, TextInput } from "payload/components/forms";
import { format } from "../utilities/formatSlug";

const TitleWithSlug: React.FC = () => {
  const { value: title, setValue: setTitle } = useField<string>({
    path: "title",
  });

  const { value: slug, setValue: setSlug } = useField<string>({
    path: "slug",
  });

  useEffect(() => {
    const generatedSlug = format(title || "");

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
