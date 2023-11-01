import { TOPBAR_NAV_HEIGTH_PX } from '@lib/constants'
import React from 'react'
import ClosetLayoutWrapperPanel from './ClosetLayoutWrapperPanel'

const availableHeight = `calc(100vh-${TOPBAR_NAV_HEIGTH_PX}px)`

interface Props {
  navigation: React.ReactNode
  children: React.ReactNode
}

const ClosetLayoutWrapper = (props: Props) => {
  return (
    <main
      className={`min-h-[${availableHeight}] mt-[${TOPBAR_NAV_HEIGTH_PX}px] relative md:pl-64`}
    >
      <ClosetLayoutWrapperPanel
        panelHeight={availableHeight}
        topbarHeight={`${TOPBAR_NAV_HEIGTH_PX}px`}
      >
        <div className="flex flex-col gap-1 p-2 h-full">{props.navigation}</div>
      </ClosetLayoutWrapperPanel>

      <main
        className={`overflow-auto w-full z-0 bg-gray-50 min-h-[${availableHeight}] relative`}
      >
        {props.children}
      </main>
    </main>
  )
}

export default ClosetLayoutWrapper
