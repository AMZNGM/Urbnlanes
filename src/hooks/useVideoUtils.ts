export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

export function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

export function getYouTubeThumbnailUrl(url: string): string | null {
  const embedUrl = getYouTubeEmbedUrl(url)
  return embedUrl ? `https://img.youtube.com/vi/${embedUrl.split('/').pop()}/maxresdefault.jpg` : null
}
