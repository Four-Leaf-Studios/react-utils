import { useState } from 'react';

export function useClipboard() {
  const [isCopied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return [isCopied, copyToClipboard] as const;
}
