import JSZip from 'jszip';
import type { ParsedFile } from './txtarParser';

/**
 * Generates a ZIP file containing all parsed files
 */
export async function generateZip(files: ParsedFile[]): Promise<Blob> {
  const zip = new JSZip();
  
  // Add each file to the zip
  files.forEach(file => {
    zip.file(file.filename, file.content);
  });
  
  // Generate the zip file as a blob
  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
}

/**
 * Triggers a download of the generated ZIP file
 */
export function downloadZip(blob: Blob, filename: string = 'files.zip'): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}