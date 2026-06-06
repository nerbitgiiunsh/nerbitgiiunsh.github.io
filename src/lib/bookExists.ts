import { bookPdfUrl, type BookSlug } from '../config/books'

function isPdfContentType(contentType: string | null): boolean {
  return (contentType ?? '').toLowerCase().includes('application/pdf')
}

function isHtmlContentType(contentType: string | null): boolean {
  return (contentType ?? '').toLowerCase().includes('text/html')
}

async function hasPdfSignature(url: string): Promise<boolean> {
  const res = await fetch(url, { headers: { Range: 'bytes=0-4' } })
  if (!res.ok && res.status !== 206) return false
  if (isHtmlContentType(res.headers.get('content-type'))) return false
  const bytes = new Uint8Array(await res.arrayBuffer())
  return String.fromCharCode(...bytes).startsWith('%PDF')
}

/** Vite SPA fallback returns 200 + text/html for missing public files. */
export async function bookPdfExists(slug: BookSlug): Promise<boolean> {
  const url = bookPdfUrl(slug)
  try {
    const head = await fetch(url, { method: 'HEAD' })
    if (!head.ok) return false
    if (isHtmlContentType(head.headers.get('content-type'))) return false
    if (isPdfContentType(head.headers.get('content-type'))) return true
    return hasPdfSignature(url)
  } catch {
    return false
  }
}
