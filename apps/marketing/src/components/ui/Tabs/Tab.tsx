import React from 'react'
import * as RUITabs from '@radix-ui/react-tabs'
import cx from 'classnames'

export interface Props extends RUITabs.TabsTriggerProps {}

const Tab = (props: Props) => {
  return (
    <RUITabs.Trigger
      {...props}
      className={cx({
        'rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap': true,
        'data-[state=active]:bg-primary/10 data-[state=active]:text-gray-900/80':
          true,
        'data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700':
          true,
      })}
    />
  )
}

export default Tab
