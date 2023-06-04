import React from 'react'

interface Props {
  children: React.ReactNode
  title?: string
}

const FormSection = (props: Props) => {
  return (
    <div className="border rounded-md p-6 flex flex-col gap-4">
      <span className="whitespace-nowrap font-medium text-xl text-gray-700">
        {props.title}
      </span>

      {props.children}
    </div>
  )
}

export default FormSection
