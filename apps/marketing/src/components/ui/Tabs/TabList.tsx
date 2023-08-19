import React from 'react'
import * as RUITabs from '@radix-ui/react-tabs'

export interface Props extends RUITabs.TabsListProps {}

const TabList = (props: Props) => {
  return (
    <RUITabs.List
      {...props}
      className="flex gap-6 overflow-scroll no-scrollbar"
    />
  )
}

export default TabList
