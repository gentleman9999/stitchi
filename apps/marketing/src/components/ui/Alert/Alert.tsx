import { InformationCircle } from 'icons'
import React from 'react'

type Severity = 'info'

interface Props {
  title?: React.ReactNode
  description?: React.ReactNode
  severity?: Severity
}

const Alert = ({ description, title, severity }: Props) => {
  return (
    <div className="rounded-sm bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {severity === 'info' ? (
            <InformationCircle
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          ) : null}
        </div>
        <div className="ml-3 flex flex-col gap-2">
          {title ? (
            <h3 className="text-sm font-medium text-blue-800">{title}</h3>
          ) : null}
          {description ? (
            <div className="text-sm text-blue-700">
              <p>{description}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Alert
