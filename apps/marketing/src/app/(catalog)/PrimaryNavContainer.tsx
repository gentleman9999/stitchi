'use client'

import React from 'react'
import cx from 'classnames'
import Container from '@components/ui/Container'
import { useSearch } from './layout-context'

interface Props {
  children: React.ReactNode
}

const PrimaryNavContainer = ({ children }: Props) => {
  const { showSearch } = useSearch()

  return (
    <div
      className={cx(
        'fixed h-topbar-height bg-white top-0 left-0 right-0 z-40 transition-all border-b',
        {
          'opacity-0 !-z-10': showSearch,
        },
      )}
    >
      <Container className="max-w-none flex items-center h-full">
        <nav className={'flex-1 flex'}>{children}</nav>
      </Container>
    </div>
  )
}

export default PrimaryNavContainer
