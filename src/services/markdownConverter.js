/**
 * Markdown Converter Service
 * Simple conversion for description text
 */

/**
 * Convert description data to simple markdown format
 * @param {Object} descriptionData - The description data
 * @returns {string} Simple markdown formatted string
 */
export const convertDescriptionToMarkdown = (descriptionData) => {
  if (!descriptionData || !descriptionData.description) return '';
  
  // Just return the description text as is, let the container handle width
  return descriptionData.description;
};

/**
 * Convert simple text to markdown
 * @param {string} text - Plain text
 * @returns {string} Markdown formatted text
 */
export const convertTextToMarkdown = (text) => {
  if (!text) return '';
  
  // Just return the text as is
  return text;
};

/**
 * Export markdown content to a downloadable file
 * @param {string} markdownContent - The markdown content
 * @param {string} filename - The filename (without extension)
 * @returns {boolean} Success status
 */
export const exportToFile = (markdownContent, filename = 'description') => {
  try {
    // Add metadata header
    const metadata = `---
title: ${filename}
generatedAt: ${new Date().toISOString()}
---

`;
    
    const fullContent = metadata + markdownContent;
    
    // Create blob and download
    const blob = new Blob([fullContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting markdown to file:', error);
    return false;
  }
};

/**
 * Get markdown preview (first 500 characters)
 * @param {string} markdownContent - The full markdown content
 * @returns {string} Preview text
 */
export const getPreview = (markdownContent, maxLength = 500) => {
  if (!markdownContent) return '';
  
  // Remove markdown formatting for preview
  const plainText = markdownContent
    .replace(/##\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength) + '...';
};

// Default export
const markdownConverter = {
  convertDescriptionToMarkdown,
  convertTextToMarkdown,
  exportToFile,
  getPreview
};

export default markdownConverter; 