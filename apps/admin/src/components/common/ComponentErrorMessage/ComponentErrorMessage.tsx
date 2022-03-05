import React from 'react'
import { Alert, AlertTitle } from '@components/ui'

export interface ComponentErrorMessageProps {
  error?: string | null
}

const ComponentErrorMessage = ({ error }: ComponentErrorMessageProps) => {
  React.useEffect(() => {
    console.error('<ComponentErrorMessage /> shown', { context: { error } })
  }, [error])

  return (
    <Alert severity="error">
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  )
}

export default ComponentErrorMessage
