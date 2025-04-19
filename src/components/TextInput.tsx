import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          onChange(content);
        }
      };
      
      reader.readAsText(file);
    }
  }, [onChange]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/plain': ['.txt', '.txtar'],
      'text/*': [],
    }
  });
  
  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 font-medium text-slate-700">Paste txtar content</div>
      <div 
        {...getRootProps()} 
        className={`flex-1 border-2 rounded-lg transition-colors ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        <input {...getInputProps()} />
        <textarea
          className="w-full h-full p-4 resize-none focus:outline-none rounded-lg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste txtar content here or drop a file..."
          onClick={(e) => e.stopPropagation()}
        />
        {isDragActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-80 rounded-lg">
            <div className="flex flex-col items-center text-blue-600">
              <Upload size={48} />
              <p className="mt-2 font-medium">Drop file here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;