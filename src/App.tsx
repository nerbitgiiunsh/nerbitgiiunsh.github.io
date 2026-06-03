import { useCallback, useState } from 'react'
import { FlipbookReader } from './components/FlipbookReader'
import { InstagramFollowModal } from './components/InstagramFollowModal'
import { hasDismissedFollowModal } from './config/social'

function App() {
  const [bookReady, setBookReady] = useState(hasDismissedFollowModal)
  const handleFollowDismiss = useCallback(() => setBookReady(true), [])

  return (
    <>
      <FlipbookReader enabled={bookReady} />
      <InstagramFollowModal onDismiss={handleFollowDismiss} />
    </>
  )
}

export default App
