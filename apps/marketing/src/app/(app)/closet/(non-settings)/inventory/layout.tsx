'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  panel: React.ReactNode
}

const Layout = ({ children, panel }: Props) => {
  return (
    <div className="flex gap-4 w-full @container">
      <div className="flex-1">{children}</div>
      {panel ? <div className="w-[500px]">{panel}</div> : null}
    </div>
  )
}

export default Layout
