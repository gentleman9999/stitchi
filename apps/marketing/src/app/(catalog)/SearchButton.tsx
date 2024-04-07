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
      name="search"
      className={cx(s.link, '!flex !font-normal gap-2 items-center')}
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
