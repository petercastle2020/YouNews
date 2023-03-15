import DOMPurify from "dompurify";

export const getSanitizedAndTruncatedText = (content, maxLength = Infinity) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const truncatedSanitizedContent = sanitizedContent.substr(0, maxLength);

  if (maxLength === Infinity) {
    return truncatedSanitizedContent;
  } else if (typeof maxLength === "number" && maxLength > 0) {
    return truncatedSanitizedContent + "...";
  } else {
    return truncatedSanitizedContent;
  }
};
