'use client'

import { Search, XIcon } from 'icons'
import React from 'react'

interface Props {
  onSubmit: () => void
  loading?: boolean
}

const SearchBar = ({ onSubmit }: Props) => {
  const [search, setSearch] = React.useState('')

  const reset = () => {
    setSearch('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="flex gap-2">
      <div className="relative w-full">
        <div className="absolute top-0 left-0 bottom-0 flex items-center">
          <Search
            className="ml-3 stroke-gray-900"
            strokeWidth={2}
            height={20}
          />
        </div>
        <input
          className="py-3 pr-5 pl-10 font-medium w-full rounded-md border-2 border-gray-400 focus:outline-gray-800 placeholder:font-normal"
          placeholder="Search for companies"
          onChange={handleChange}
          value={search}
        />
        <div className="absolute top-0 right-0 bottom-0 flex items-center">
          {search.length > 0 ? (
            <button className="mr-3 text-gray-900" onClick={reset}>
              <XIcon strokeWidth={2} height={20} />
            </button>
          ) : null}
        </div>
      </div>

      <button className="rounded-md bg-gray-900 p-3" onClick={onSubmit}>
        <Search className="stroke-white" strokeWidth={2} height={14} />
      </button>
    </div>
  )
}

export default SearchBar
