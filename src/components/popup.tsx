import React, { useEffect, useState } from "react";

const Popup: React.FC = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        setUrl(tabs[0].url);
      }
    });
  }, []);

  return (
    <div>
      <h1>Current Tab URL:</h1>
      <p>{url}</p>
    </div>
  );
};

export default Popup;
