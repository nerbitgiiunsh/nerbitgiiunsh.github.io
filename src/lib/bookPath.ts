import { bookPdfUrl, isBookSlug, type BookSlug } from '../config/books'

function pathnameWithoutBase(pathname: string): string {
  const base = import.meta.env.BASE_URL
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  if (prefix && prefix !== '/' && pathname.startsWith(prefix)) {
    const rest = pathname.slice(prefix.length)
    return rest || '/'
  }
  return pathname
}

export function lastPathSegment(pathname: string): string | null {
  const decoded = decodeURIComponent(pathnameWithoutBase(pathname)).replace(
    /\/+$/,
    '',
  )
  const segments = decoded.split('/').filter(Boolean)
  if (segments.length === 0) return null
  return segments[segments.length - 1] || null
}

function slugFromSegment(segment: string): BookSlug | null {
  let candidate = segment
  if (candidate.toLowerCase().endsWith('.pdf')) {
    candidate = candidate.slice(0, -4)
  } else if (candidate.includes('.')) {
    return null
  }
  return isBookSlug(candidate) ? candidate : null
}

export function pathnameLooksLikeBook(pathname: string): boolean {
  return lastPathSegment(pathname) !== null
}

/** `/ebook/1`, `/ebook/1.pdf` → slug `1` */
export function getBookSlugFromPathname(pathname: string): BookSlug | null {
  const segment = lastPathSegment(pathname)
  if (!segment) return null
  return slugFromSegment(segment)
}

export function getBookSourceFromPathname(pathname: string): string | null {
  const slug = getBookSlugFromPathname(pathname)
  return slug ? bookPdfUrl(slug) : null
}

/** `/1.pdf` → `/1` (base-тай) */
export function canonicalBookPath(slug: BookSlug): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
  return `${base}${encodeURIComponent(slug)}`
}

export function pathnameUsesPdfSuffix(pathname: string): boolean {
  const segment = lastPathSegment(pathname)
  return segment?.toLowerCase().endsWith('.pdf') ?? false
}
