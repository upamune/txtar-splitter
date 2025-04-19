import React, { useState } from 'react';
import { Download } from 'lucide-react';
import type { ParsedFile } from '../utils/txtarParser';
import { generateZip, downloadZip } from '../utils/zipGenerator';
import { getIconForFilename } from '../utils/fileIconUtil';
import FilePreview from './FilePreview';

interface FileListProps {
  files: ParsedFile[];
  header: string;
}

const FileList: React.FC<FileListProps> = ({ files, header }) => {
  const [selectedFile, setSelectedFile] = useState<ParsedFile | null>(null);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  
  const handleDownloadClick = async () => {
    if (files.length === 0) return;
    
    setIsGeneratingZip(true);
    try {
      const blob = await generateZip(files);
      downloadZip(blob);
    } catch (error) {
      console.error('Error generating ZIP:', error);
    } finally {
      setIsGeneratingZip(false);
    }
  };
  
  if (files.length === 0) {
    return (
      <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-8">
        <div className="text-center text-slate-500">
          <p className="mb-2 text-lg font-medium">No files detected</p>
          <p className="text-sm">
            Paste txtar content in the left panel to see extracted files here
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-slate-700">
          {files.length} {files.length === 1 ? 'file' : 'files'} extracted
        </h2>
        <button
          onClick={handleDownloadClick}
          disabled={isGeneratingZip || files.length === 0}
          className={`
            flex items-center gap-2 py-2 px-4 rounded-lg 
            text-white font-medium transition-colors
            ${isGeneratingZip || files.length === 0
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }
          `}
        >
          <Download size={16} />
          <span>Download ZIP</span>
        </button>
      </div>
      
      {header && (
        <div className="mb-4 p-4 bg-slate-100 rounded-lg">
          <h3 className="font-medium text-slate-700 mb-2">Header</h3>
          <pre className="text-sm whitespace-pre-wrap text-slate-600">{header}</pre>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {files.map((file, index) => {
          const Icon = getIconForFilename(file.filename);
          const isSelected = selectedFile?.filename === file.filename;
          
          return (
            <div
              key={`${file.filename}-${index}`}
              className={`
                p-3 border rounded-lg cursor-pointer transition-all
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }
              `}
              onClick={() => setSelectedFile(file)}
            >
              <div className="flex items-center gap-3">
                <Icon className="text-slate-600" size={20} />
                <span className="font-mono text-sm truncate" title={file.filename}>
                  {file.filename}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {file.content.length} characters
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedFile && (
        <div className="flex-1 overflow-auto">
          <FilePreview
            filename={selectedFile.filename}
            content={selectedFile.content}
          />
        </div>
      )}
    </div>
  );
};

export default FileList;