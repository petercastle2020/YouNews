import DOMPurify from "dompurify";

export const getSanitizedAndTruncatedText = (content, maxLength) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const textContent = sanitizedContent.replace(/(<([^>]+)>)/gi, "");
  const truncatedText = textContent.substr(0, maxLength) + "...";
  return truncatedText;
};
