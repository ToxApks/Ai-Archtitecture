
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1e293b] rounded-lg shadow-lg overflow-hidden my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700/50">
        <div className="flex items-center gap-2">
           {title && <p className="text-sm font-semibold text-gray-300">{title}</p>}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400">{language}</span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Copy code"
          >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
