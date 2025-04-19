import {
  FileText,
  FileCode,
  FileJson,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  File,
  FileTerminal,
  FileCog,
  FileType,
} from 'lucide-react';

/**
 * Returns the appropriate icon component for a file based on its filename
 */
export function getIconForFilename(filename: string): typeof FileText {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  switch (extension) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'html':
    case 'css':
    case 'vue':
    case 'svelte':
      return FileCode;
    case 'json':
      return FileJson;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
      return FileImage;
    case 'zip':
    case 'tar':
    case 'gz':
    case 'rar':
      return FileArchive;
    case 'csv':
    case 'xlsx':
    case 'xls':
      return FileSpreadsheet;
    case 'sh':
    case 'bash':
    case 'zsh':
      return FileTerminal;
    case 'md':
    case 'txt':
      return FileText;
    case 'go':
    case 'rs':
    case 'c':
    case 'cpp':
    case 'h':
    case 'py':
    case 'rb':
    case 'php':
      return FileType;
    case 'toml':
    case 'yaml':
    case 'yml':
    case 'xml':
    case 'ini':
    case 'conf':
      return FileCog;
    default:
      return File;
  }
}