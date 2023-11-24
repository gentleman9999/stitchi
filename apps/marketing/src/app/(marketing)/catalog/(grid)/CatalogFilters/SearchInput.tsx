import React from 'react'
import { Search, XIcon } from 'icons'

interface Props {
  onSubmit: (searchVal: string) => void
  loading?: boolean
}

const SearchInput = ({ onSubmit, loading }: Props) => {
  const [search, setSearch] = React.useState('')

  const reset = () => {
    setSearch('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="flex items-stretch gap-1">
      <div className="relative w-full flex">
        <div className="absolute top-0 left-0 bottom-0 flex items-center">
          <Search
            className="ml-3 stroke-gray-900"
            strokeWidth={2}
            height={20}
          />
        </div>
        <input
          type="text"
          name="search"
          className="py-1 pr-5 pl-10 text-sm font-medium w-full rounded-md border focus:outline-gray-800 placeholder:font-normal"
          placeholder="Search our catalog"
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

      <button
        className="rounded-md border p-3"
        onClick={() => onSubmit(search)}
      >
        <Search className="stroke-gray-900" strokeWidth={2} height={14} />
      </button>
    </div>
  )
}

export default SearchInput
