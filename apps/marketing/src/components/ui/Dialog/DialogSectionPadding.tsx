import React from 'react'

interface Props {
  children?: React.ReactNode
}

const DialogSectionPadding = ({ children }: Props) => {
  return <div className="px-4 pt-4 sm:px-6 sm:pt-6">{children}</div>
}

export default DialogSectionPadding
