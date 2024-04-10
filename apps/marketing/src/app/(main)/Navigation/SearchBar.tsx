'use client'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import { COMPANY_NAME } from '@lib/constants'
import routes from '@lib/routes'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSearch } from '../search-context'
import { cn } from '@lib/utils'

const schema = yup.object().shape({
  searchTerm: yup.string(),
})

interface Props {
  className?: string
}

const SearchBar = ({ className }: Props) => {
  const { searchTerm, setShowSearch } = useSearch()

  const router = useRouter()
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      searchTerm: searchTerm || '',
    },
  })

  const handleSubmit = form.handleSubmit(data => {
    setShowSearch(false)
    router.push(
      routes.internal.catalog.all.href({
        params: {
          searchTerm: data.searchTerm || undefined,
        },
      }),
    )
  })

  return (
    <>
      <form
        className={cn('flex-auto w-full group', className)}
        onSubmit={handleSubmit}
      >
        <div className="w-full bg-white rounded-sm group-focus:ring group-focus:ring-primary flex items-center pr-2 h-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            placeholder={`Search for a product`}
            className="w-full rounded-sm border-none focus:ring-0 focus:border-none px-4 py-0 placeholder:text-sm"
            {...form.register('searchTerm')}
          />
          <button
            type="button"
            onClick={() => {
              form.setValue('searchTerm', '')
            }}
            className="flex items-center justify-center rounded-full bg-gray-100 p-1"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </>
  )
}

export default SearchBar
