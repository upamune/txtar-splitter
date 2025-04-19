/**
 * Parser for the txtar format as defined in golang.org/x/tools/txtar
 * 
 * The format is:
 * - Header lines (optional)
 * - A line containing just the text "-- FILENAME --" followed by file content
 * - Repeated for each file
 */

export interface ParsedFile {
  filename: string;
  content: string;
}

export interface ParseResult {
  header: string;
  files: ParsedFile[];
}

/**
 * Parses txtar content into header and files
 */
export function parseTxtar(content: string): ParseResult {
  // If content is empty, return empty result
  if (!content.trim()) {
    return { header: '', files: [] };
  }

  const lines = content.split(/\r?\n/);
  const files: ParsedFile[] = [];
  let headerLines: string[] = [];
  
  let currentFile: ParsedFile | null = null;
  let currentContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a file marker line: -- FILENAME --
    const fileMarkerMatch = line.match(/^-- (.+) --$/);
    
    if (fileMarkerMatch) {
      // If we were building a file, finalize it and add to the list
      if (currentFile) {
        currentFile.content = currentContent.join('\n');
        files.push(currentFile);
        currentContent = [];
      }
      
      // Start a new file
      currentFile = {
        filename: fileMarkerMatch[1],
        content: '',
      };
    } else if (currentFile) {
      // Add line to current file content
      currentContent.push(line);
    } else {
      // If we haven't seen a file marker yet, this is part of the header
      headerLines.push(line);
    }
  }
  
  // Don't forget to add the last file if there is one
  if (currentFile) {
    currentFile.content = currentContent.join('\n');
    files.push(currentFile);
  }
  
  return {
    header: headerLines.join('\n'),
    files,
  };
}