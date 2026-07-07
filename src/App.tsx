import { useCallback, useState } from 'react'
import { DonationButton } from './components/DonationButton'
import { FlipbookReader } from './components/FlipbookReader'
import { InstagramFollowModal } from './components/InstagramFollowModal'
import { NotFound } from './components/NotFound'
import { hasDismissedFollowModal } from './config/social'
import { useBookRoute } from './hooks/useBookRoute'

function App() {
  const route = useBookRoute()
  const [bookReady, setBookReady] = useState(hasDismissedFollowModal)
  const handleFollowDismiss = useCallback(() => setBookReady(true), [])

  const readerEnabled = bookReady && route === 'book'

  return (
    <>
      {route === 'not-found' ? (
        <NotFound />
      ) : (
        <>
          <FlipbookReader enabled={readerEnabled} />
          {route !== 'loading' && (
            <InstagramFollowModal onDismiss={handleFollowDismiss} />
          )}
        </>
      )}
      <DonationButton />
    </>
  )
}

export default App
