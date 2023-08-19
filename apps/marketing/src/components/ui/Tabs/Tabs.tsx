import React from 'react'
import * as RUITabs from '@radix-ui/react-tabs'
import Tab from './Tab'
import Content from './Content'
import TabList from './TabList'

export interface Props extends RUITabs.TabsProps {}

const Tabs = (props: Props) => {
  return <RUITabs.Root {...props} />
}

Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.Content = Content

export default Tabs
