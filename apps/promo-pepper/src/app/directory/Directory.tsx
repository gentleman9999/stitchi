'use client'
import React from 'react'
import { CompanyCard } from '@/components/common'
import SearchBar from '@/components/common/SearchBar'
import Filters from './Filters'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import { QueryResult, useQuery } from '@apollo/client'
import {
  defaultQueryVariables,
  directoryIndexPageGetData,
} from './directoryIndexPageGetData'
import {
  DirectoryIndexPageGetDataQuery,
  DirectoryIndexPageGetDataQueryVariables,
} from '@/__generated__/graphql'
import InfiniteScrollTrigger from './Filters/InfiniteScrollTrigger'
import { initializeApollo } from '@/lib/apollo'
import { DirectoryProvider, useDirectory } from './directory-context'

const client = initializeApollo()

export default function Directory() {
  const query = useQuery<
    DirectoryIndexPageGetDataQuery,
    DirectoryIndexPageGetDataQueryVariables
  >(directoryIndexPageGetData, {
    client,
    variables: defaultQueryVariables,
    notifyOnNetworkStatusChange: true,
  })

  return (
    <DirectoryProvider>
      <DirectoryInner query={query} />
    </DirectoryProvider>
  )
}

interface Props {
  query: QueryResult<DirectoryIndexPageGetDataQuery>
}

function DirectoryInner(props: Props) {
  const { refetch, fetchMore, loading } = props.query

  const data = getFragmentData(
    DirectoryIndexPageQueryFragment,
    props.query.data,
  )
  const { selectedCategoryIds } = useDirectory()

  const { directory, directoryMetadata } = data || {}

  React.useEffect(() => {
    refetch({
      filter: {
        ...defaultQueryVariables.filter,
        categories: {
          anyIn: Array.from(selectedCategoryIds),
        },
      },
    })
  }, [refetch, selectedCategoryIds])

  const handleIntersect = () => {
    if (loading) return

    const directoryCurrentLength = directory?.length || 0
    const directoryTotalLength = directoryMetadata?.count || 0

    if (directoryCurrentLength >= directoryTotalLength) return

    fetchMore({ variables: { skip: directoryCurrentLength } })
  }

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-12">
          <SearchBar onSubmit={() => {}} loading={false} />
          <Filters />
        </div>
        <div>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {directory?.map(companyData => {
              return (
                <CompanyCard
                  component="li"
                  companyData={companyData}
                  key={companyData.id}
                />
              )
            })}
            {loading ? (
              <>
                {Array.from(new Array(4)).map((_, i) => (
                  <CompanyCard component="li" key={i} loading />
                ))}
              </>
            ) : null}
          </ul>
        </div>
        <InfiniteScrollTrigger onIntersect={handleIntersect} />
      </div>
    </>
  )
}

export const DirectoryIndexPageQueryFragment = gql(/* GraphQL */ `
  fragment DirectoryIndexPageQuery on Query {
    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {
      id
      ...CompanyCardCompany
    }

    directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {
      count
    }
  }
`)
