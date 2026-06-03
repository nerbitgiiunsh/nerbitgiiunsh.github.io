/**
 * Slug → public/books/ доторх PDF файл.
 * Шинэ ном: public/books/ + энд slug нэмнэ.
 */
export const BOOKS = {
  '1': '1.pdf',
  'Aldana_l_gej_baihgui-_MAIKL_UTGIeR': 'Aldana_l_gej_baihgui-_MAIKL_UTGIeR.pdf',
} as const

export type BookSlug = keyof typeof BOOKS

export function isBookSlug(value: string): value is BookSlug {
  return Object.prototype.hasOwnProperty.call(BOOKS, value)
}

/** DearFlip-д өгөх зам (root дээр биш → /1.pdf SPA viewer ажиллана) */
export function bookPdfUrl(slug: BookSlug): string {
  const base = import.meta.env.BASE_URL
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}books/${BOOKS[slug]}`
}
