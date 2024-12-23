import * as React from 'react'
import { ApolloError } from '@apollo/client'
import { track } from '@lib/analytics'
import { useLogger } from 'next-axiom'

interface Props {
  error?: string | ApolloError
}

const ComponentErrorMessage = (props: Props) => {
  const logger = useLogger()
  const message =
    typeof props.error === 'string'
      ? props.error
      : props.error?.graphQLErrors.map(error => error.message).join(', ')

  React.useEffect(() => {
    if (props.error) {
      logger.error('error shown', { error: props.error })
      track.errorShown({ error: props.error })
    }
  }, [message, props.error, logger])

  if (!message) {
    return null
  }

  return (
    <div className="w-full p-4 rounded-sm text-xs text-white bg-red-500 flex items-center">
      <div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ComponentErrorMessage
