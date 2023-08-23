import * as React from 'react'
import { ApolloError } from '@apollo/client'
import { track } from '@lib/analytics'

interface Props {
  error?: string | ApolloError
}

const ComponentErrorMessage = (props: Props) => {
  const message =
    typeof props.error === 'string'
      ? props.error
      : props.error?.graphQLErrors.map(error => error.message).join(', ')

  React.useEffect(() => {
    if (props.error) {
      console.error(props.error)
      track.errorShown({ error: props.error })
    }
  }, [message, props.error])

  if (!message) {
    return null
  }

  return (
    <div className="w-full p-4 rounded-sm text-xs text-white bg-red-500 flex items-center">
      <div>
        <h6 className="text-sm font-bold">Error!</h6>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ComponentErrorMessage
