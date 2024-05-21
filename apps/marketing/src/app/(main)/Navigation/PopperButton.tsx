'use client'

import React from 'react'
import { usePopper } from './PopperContext'

interface Props {
  children: React.ReactElement
}

const PopperButton = (props: Props) => {
  const { close } = usePopper()

  return React.cloneElement(props.children, {
    onClick: (...params: any[]) => {
      close()
      props.children.props.onClick?.(...params)
    },
  })
}

export default PopperButton
