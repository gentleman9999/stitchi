import React from 'react'

interface Props {
  children: React.ReactNode
  title?: string
}

const FormSection = (props: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {props.title ? (
        <span className="whitespace-nowrap font-medium text-2xl text-gray-700">
          {props.title}
        </span>
      ) : null}

      {props.children}
    </div>
  )
}

export default FormSection
