import React, { useState, useEffect } from 'react';
import { PackageOpen } from 'lucide-react';
import TextInput from './components/TextInput';
import FileList from './components/FileList';
import { parseTxtar } from './utils/txtarParser';

function App() {
  const [txtarContent, setTxtarContent] = useState('');
  const [parsedResult, setParsedResult] = useState({ header: '', files: [] });
  
  // Parse txtar content whenever it changes
  useEffect(() => {
    try {
      const result = parseTxtar(txtarContent);
      setParsedResult(result);
    } catch (error) {
      console.error('Error parsing txtar content:', error);
    }
  }, [txtarContent]);
  
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="mb-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <PackageOpen className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-slate-800">txtar Splitter</h1>
          </div>
          <p className="mt-2 text-slate-600">
            Split txtar files into individual files and download them as a ZIP archive
          </p>
        </div>
      </header>
      
      <main className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 h-full">
            <TextInput
              value={txtarContent}
              onChange={setTxtarContent}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 h-full">
            <FileList
              files={parsedResult.files}
              header={parsedResult.header}
            />
          </div>
        </div>
      </main>
      
      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>
          Based on the{' '}
          <a 
            href="https://pkg.go.dev/golang.org/x/tools/txtar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            golang.org/x/tools/txtar
          </a>
          {' '}format
        </p>
      </footer>
    </div>
  );
}

export default App;