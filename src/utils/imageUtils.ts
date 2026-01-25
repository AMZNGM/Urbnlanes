export function generateBlurDataURL(width = 8, height = 8): string {
  const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#2d2a26" filter="url(#blur)"/>
    </svg>
  `

  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

export function getBlurDataUrl(imagePath: string): string {
  return generateBlurDataURL()
}
