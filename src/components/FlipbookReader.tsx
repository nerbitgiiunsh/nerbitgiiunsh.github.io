import { useEffect } from 'react'
import {
  canonicalBookPath,
  getBookSlugFromPathname,
  getBookSourceFromPathname,
  pathnameUsesPdfSuffix,
} from '../lib/bookPath'
import { waitAndOpenDearflipPdf } from '../lib/openDearflipPdf'

/** URL path → DearFlip lightbox (a.html-тай ижил) */
export function FlipbookReader() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const openFromPath = () => {
      const pathname = window.location.pathname
      const slug = getBookSlugFromPathname(pathname)
      if (!slug) return

      if (pathnameUsesPdfSuffix(pathname)) {
        const canonical = canonicalBookPath(slug)
        window.history.replaceState(null, '', canonical)
      }

      const source = getBookSourceFromPathname(window.location.pathname)
      if (!source) return
      cleanup?.()
      cleanup = waitAndOpenDearflipPdf(source)
    }

    openFromPath()
    window.addEventListener('popstate', openFromPath)

    return () => {
      window.removeEventListener('popstate', openFromPath)
      cleanup?.()
    }
  }, [])

  return null
}
