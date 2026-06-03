/**
 * Номын slug = public/books/ доторх PDF-ийн нэр (.pdf-гүй).
 * Шинэ ном: public/books/foo.pdf тавихад /foo эсвэл /foo.pdf ажиллана.
 */
export type BookSlug = string

const UNSAFE_SLUG = /[/\\]|\.\./

export function isBookSlug(value: string): value is BookSlug {
  if (!value || value === '.' || value === '..') return false
  return !UNSAFE_SLUG.test(value)
}

/** DearFlip-д өгөх зам (root дээр биш → /1.pdf SPA viewer ажиллана) */
export function bookPdfUrl(slug: BookSlug): string {
  const base = import.meta.env.BASE_URL
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}books/${encodeURIComponent(slug)}.pdf`
}
