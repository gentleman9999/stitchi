'use client'

import React from 'react'
import s from './layout.module.css'
import cx from 'classnames'
import { Search } from 'icons'
import { useSearch } from './layout-context'

interface Props {}

const SearchButton = (props: Props) => {
  const { setShowSearch } = useSearch()

  return (
    <button
      className={cx(s.link, '!hidden !font-normal lg:!flex gap-2 items-center')}
      onClick={() => {
        setShowSearch(true)
      }}
    >
      <Search className="w-4 h-4 stroke-2" />
      Search
    </button>
  )
}

export default SearchButton