'use client'

import Button from '@components/ui/ButtonV2/Button'
import Container from '@components/ui/Container'
import { useEffect } from 'react'

// Error components must be Client Components

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <Container>
          <h2>Something went wrong!</h2>
          <Button onClick={() => reset()}>Try again</Button>
        </Container>
      </body>
    </html>
  )
}

export default GlobalError
