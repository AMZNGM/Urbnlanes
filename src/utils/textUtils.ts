// Converts arrays to formatted text with spacing
export function formatTextContent(content: string | string[]): string {
  if (Array.isArray(content)) {
    return content.join(' ')
  }
  return content || ''
}

// Converts arrays to text with each item on a new line (for descriptions)
export function formatMultilineTextContent(content: string | string[]): string {
  if (Array.isArray(content)) {
    return content.join('\n\n')
  }
  return content || ''
}
