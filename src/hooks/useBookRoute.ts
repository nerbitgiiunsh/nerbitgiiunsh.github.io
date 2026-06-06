import { useEffect, useState } from 'react'
import { bookPdfExists } from '../lib/bookExists'
import {
  getBookSlugFromPathname,
  pathnameLooksLikeBook,
} from '../lib/bookPath'

export type BookRoute = 'home' | 'loading' | 'book' | 'not-found'

function resolveRoute(pathname: string): BookRoute {
  if (!pathnameLooksLikeBook(pathname)) return 'home'
  if (!getBookSlugFromPathname(pathname)) return 'not-found'
  return 'loading'
}

export function useBookRoute(): BookRoute {
  const [route, setRoute] = useState<BookRoute>(() =>
    resolveRoute(window.location.pathname),
  )

  useEffect(() => {
    let requestId = 0

    const sync = () => {
      const id = ++requestId
      const pathname = window.location.pathname
      const next = resolveRoute(pathname)
      setRoute(next)

      if (next !== 'loading') return

      const slug = getBookSlugFromPathname(pathname)
      if (!slug) {
        setRoute('not-found')
        return
      }

      bookPdfExists(slug).then((exists) => {
        if (id !== requestId) return
        setRoute(exists ? 'book' : 'not-found')
      })
    }

    sync()
    window.addEventListener('popstate', sync)
    return () => {
      requestId += 1
      window.removeEventListener('popstate', sync)
    }
  }, [])

  return route
}
