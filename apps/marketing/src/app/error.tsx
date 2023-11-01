'use client' // Error components must be Client Components
import Button from '@components/ui/ButtonV2/Button'
import Container from '@components/ui/Container'
import { useEffect } from 'react'

const Error = ({
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
    <Container>
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Container>
  )
}

export default Error
