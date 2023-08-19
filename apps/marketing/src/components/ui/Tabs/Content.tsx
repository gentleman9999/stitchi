import React from 'react'
import * as RUITabs from '@radix-ui/react-tabs'

export interface Props extends RUITabs.TabsContentProps {}

const Content = (props: Props) => {
  return <RUITabs.Content {...props} />
}

export default Content
