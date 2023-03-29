import * as React from 'react'
import { ApolloError } from '@apollo/client'

interface Props {
  error?: string | ApolloError
}

const ComponentErrorMessage = (props: Props) => {
  const message =
    typeof props.error === 'string'
      ? props.error
      : props.error?.graphQLErrors.map(error => error.message).join(', ')

  React.useEffect(() => {
    console.error(props.error)
  }, [message, props.error])

  if (!message) {
    return null
  }

  return (
    <div className="p-6 m-4 rounded-sm  flex justify-center items-center">
      <div>
        <h6 className="text-lg font-bold">Error!</h6>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ComponentErrorMessage
