'use client'
import React from 'react'
// import SearchBar from '@/components/common/SearchBar'
import Filters from './Filters'
import { getFragmentData, gql } from '@/__generated__'
import { QueryResult, useQuery } from '@apollo/client'

import {
  DirectoryIndexPageGetDataQuery,
  DirectoryIndexPageGetDataQueryVariables,
} from '@/__generated__/graphql'
import { initializeApollo } from '@/lib/apollo'
import { DirectoryProvider, useDirectory } from './directory-context'
import { InfiniteScrollTrigger } from '@/components/common'
import CompanyCardGrid from './CompanyCardGrid'

const client = initializeApollo()

const defaultQueryVariables: DirectoryIndexPageGetDataQueryVariables = {
  first: 20,
  filter: { entryType: { eq: 'companies' } },
}

export default function Directory({
  categoryId,
  parentCategoryId,
}: {
  categoryId?: string
  parentCategoryId?: string
}) {
  const result = useQuery<
    DirectoryIndexPageGetDataQuery,
    DirectoryIndexPageGetDataQueryVariables
  >(DirectoryIndexPageGetData, {
    client,
    notifyOnNetworkStatusChange: true,
    variables: {
      ...defaultQueryVariables,
      filter: {
        ...defaultQueryVariables.filter,
        categories: {
          allIn: [parentCategoryId],
        },
      },
    },
  })

  return (
    <DirectoryProvider queryResult={result} categoryId={categoryId}>
      <DirectoryInner query={result} parentCategoryId={parentCategoryId} />
    </DirectoryProvider>
  )
}

interface Props {
  query: QueryResult<DirectoryIndexPageGetDataQuery>
  parentCategoryId?: string
}

function DirectoryInner(props: Props) {
  const { loading, data } = props.query

  const { fetchMoreResults } = useDirectory()

  const { directory, directoryMetadata } = data || {}

  const handleIntersect = () => {
    if (loading) return

    const directoryCurrentLength = directory?.length || 0
    const directoryTotalLength = directoryMetadata?.count || 0

    if (directoryCurrentLength >= directoryTotalLength) return

    fetchMoreResults()
  }

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-12">
          {/* <SearchBar onSubmit={() => {}} loading={false} /> */}
          <Filters parentCategoryId={props.parentCategoryId} />
        </div>
        <div>
          <CompanyCardGrid companies={directory} loading={loading} />
        </div>
        <InfiniteScrollTrigger onIntersect={handleIntersect} />
      </div>
    </>
  )
}

export const DirectoryIndexPageGetData = gql(/* GraphQL */ `
  query DirectoryIndexPageGetData(
    $first: IntType
    $skip: IntType
    $filter: GlossaryEntryModelFilter
  ) {
    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {
      id
      ...CompanyCardGridCompany
    }

    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {
      count
    }
  }
`)
