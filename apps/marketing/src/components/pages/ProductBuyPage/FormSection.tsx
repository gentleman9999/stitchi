import React from 'react'

interface Props {
  children: React.ReactNode
}

const FormSection = (props: Props) => {
  return <div className="border rounded-sm p-4">{props.children}</div>
}

export default FormSection
