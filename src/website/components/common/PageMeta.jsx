import { useEffect } from "react";

const PageMeta = ({ title, description }) => {
  useEffect(() => {
    const prevTitle = document.title;

    // Find existing description meta or create one
    let meta =
      document.querySelector < HTMLMetaElement > "meta[name='description']";
    let createdMeta = false;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
      createdMeta = true;
    }
    const prevDescription = meta.content;

    // Set current page metadata
    document.title = title;
    meta.content = description;

    // Cleanup on unmount
    return () => {
      document.title = prevTitle;
      if (meta) {
        meta.content = prevDescription;
        if (createdMeta) {
          document.head.removeChild(meta);
        }
      }
    };
  }, [title, description]);

  return null;
};

export default PageMeta;
