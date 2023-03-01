const Blob = require("blob");

const unusedBlob = new Blob([]);
console.log(unusedBlob);
// This will create a new Blob object
// and assign it to the variable
// unusedBlob, which is never actually used.

export async function convertImageUrlToBase64(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
