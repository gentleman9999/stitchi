'use client'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React from 'react'
import cx from 'classnames'
import { useAppLayoutContext } from './app-layout-context'

interface Props {
  children: React.ReactNode
}

const LogoButton = (props: Props) => {
  const { sidebarOpen, setSidebarOpen } = useAppLayoutContext()

  return (
    <button
      className="flex gap-2 items-center"
      onClick={() => setSidebarOpen(prev => !prev)}
    >
      {props.children}
      <ChevronDownIcon
        className={cx('w-6 transform transition-all', {
          'rotate-180': sidebarOpen,
        })}
      />
    </button>
  )
}

export default LogoButton
