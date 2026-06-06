import { useCallback, useState } from 'react'
import { FlipbookReader } from './components/FlipbookReader'
import { InstagramFollowModal } from './components/InstagramFollowModal'
import { NotFound } from './components/NotFound'
import { hasDismissedFollowModal } from './config/social'
import { useBookRoute } from './hooks/useBookRoute'

function App() {
  const route = useBookRoute()
  const [bookReady, setBookReady] = useState(hasDismissedFollowModal)
  const handleFollowDismiss = useCallback(() => setBookReady(true), [])

  if (route === 'not-found') {
    return <NotFound />
  }

  const readerEnabled = bookReady && route === 'book'

  return (
    <>
      <FlipbookReader enabled={readerEnabled} />
      {route !== 'loading' && (
        <InstagramFollowModal onDismiss={handleFollowDismiss} />
      )}
    </>
  )
}

export default App
