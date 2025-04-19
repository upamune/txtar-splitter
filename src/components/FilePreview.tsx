import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';

interface FilePreviewProps {
  filename: string;
  content: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ filename, content }) => {
  const codeRef = useRef<HTMLElement>(null);
  
  const getLanguageFromFilename = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    switch (extension) {
      case 'html':
      case 'xml':
        return 'markup';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'jsx':
        return 'jsx';
      case 'tsx':
        return 'tsx';
      case 'json':
        return 'json';
      case 'yml':
      case 'yaml':
        return 'yaml';
      case 'md':
        return 'markdown';
      case 'sh':
      case 'bash':
        return 'bash';
      case 'py':
        return 'python';
      case 'go':
        return 'go';
      case 'rs':
        return 'rust';
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      default:
        return 'plaintext';
    }
  };
  
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [content, filename]);
  
  const language = getLanguageFromFilename(filename);
  
  return (
    <div className="bg-slate-50 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-slate-200 px-4 py-2 text-slate-700 font-mono text-sm border-b border-slate-300">
        {filename}
      </div>
      <pre className="max-h-[500px] overflow-auto p-4 text-sm">
        <code ref={codeRef} className={`language-${language}`}>
          {content}
        </code>
      </pre>
    </div>
  );
};

export default FilePreview;