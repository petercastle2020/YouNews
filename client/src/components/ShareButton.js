import { useState, useEffect } from "react";

const ShareButton = ({ articleId, onShareClick }) => {
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    console.log(isSharing);
  }, [isSharing]);

  const handleShareClick = async () => {
    setIsSharing(true);

    // Call the onShare callback function passed from the parent
    await onShareClick(articleId);

    setIsSharing(false);
  };

  return (
    <button onClick={handleShareClick} disabled={isSharing}>
      {isSharing ? "Sharing..." : "Share"}
    </button>
  );
};

export default ShareButton;
