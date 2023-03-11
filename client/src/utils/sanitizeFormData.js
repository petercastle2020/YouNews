import DOMPurify from "dompurify";

export const sanitizeFormData = (formData) => {
  const sanitizedData = {};

  // loop through each key-value pair in the form data
  for (let [key, value] of formData.entries()) {
    // sanitize the value using DOMPurify
    const sanitizedValue = DOMPurify.sanitize(value);

    // store the sanitized value in the sanitizedData object
    sanitizedData[key] = sanitizedValue;
  }

  return sanitizedData;
};
