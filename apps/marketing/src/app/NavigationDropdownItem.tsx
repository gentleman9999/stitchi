import { useDropdownGroup } from '@components/common/DropdownGroup'
import React from 'react'

const NavigationDropdownItem = (props: { children: React.ReactElement }) => {
  const { setActiveDropdownId } = useDropdownGroup()

  if (Array.isArray(props.children)) {
    throw new Error('NavigationDropdownItem expects a single child element')
  }

  const childrenWithRef = React.cloneElement(props.children, {
    onClick: () => {
      props.children.props.onClick?.()
      setActiveDropdownId(null)
    },
  })

  return childrenWithRef
}

export default NavigationDropdownItem
