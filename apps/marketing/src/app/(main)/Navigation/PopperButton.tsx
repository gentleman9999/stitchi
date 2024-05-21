'use client'

import React from 'react'
import { usePopper } from './PopperContext'

interface Props {
  children: React.ReactElement
}

const PopperButton = React.forwardRef<HTMLElement, Props>(
  ({ children }, ref) => {
    const { hide } = usePopper()

    return React.cloneElement(children, {
      ref,
      onClick: (...params: any[]) => {
        hide()
        children.props.onClick?.(...params)
      },
    })
  },
)

PopperButton.displayName = 'PopperButton'

export default PopperButton
