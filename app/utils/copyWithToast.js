// utils/copyWithToast.js
import { useState, useEffect } from 'react';

export function useCopyWithToast(timeout = 2000) {
  const [toastVisible, setToastVisible] = useState(false);

  const copyToClipboard = (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not supported');
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setToastVisible(true);
    });
  };

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [toastVisible, timeout]);

  const Toast = ({ message = "Copied to clipboard!" }) =>
    toastVisible ? (
      <div className="fixed bottom-4 right-4 bg-blue-200 text-blue-600 px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-slideIn">
        {message}
      </div>
    ) : null;

  return { copyToClipboard, Toast };
}
