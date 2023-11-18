import React from 'react'
import ClosetLayoutWrapperPanel from './ClosetLayoutWrapperPanel'

interface Props {
  navigation: React.ReactNode
  children: React.ReactNode
}

const ClosetLayoutWrapper = (props: Props) => {
  return (
    <div className={`md:pl-60`}>
      <ClosetLayoutWrapperPanel>
        <div className="flex flex-col gap-1 p-2 h-full">{props.navigation}</div>
      </ClosetLayoutWrapperPanel>

      <main
        className={`w-full z-0 bg-gray-50 min-h-[calc(100vh-var(--topbar-height))] relative`}
      >
        {props.children}
      </main>
    </div>
  )
}

export default ClosetLayoutWrapper
