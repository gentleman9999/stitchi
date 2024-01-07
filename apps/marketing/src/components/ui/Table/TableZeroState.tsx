import { Search } from 'icons'
import React from 'react'

interface Props {}

const TableZeroState = (props: Props) => {
  return (
    <div className="py-20 flex items-center justify-center border-y">
      <div className="flex flex-col gap-2">
        <div>
          <div className="rounded-sm bg-gray-100 inline-flex p-2">
            <Search className="w-6 h-6 stroke-2 stroke-gray-400" />
          </div>
        </div>

        <div>
          <h2 className="text-xl leading-loose">No results found</h2>
          <p className="text-sm text-gray-600">
            There aren&apos;t any results for that query.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TableZeroState
