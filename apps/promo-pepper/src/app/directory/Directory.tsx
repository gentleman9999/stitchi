'use client'
import React from 'react'
import { CompanyCard } from '@/components/common'
import SearchBar from '@/components/common/SearchBar'
import Filters from './Filters'
import { getFragmentData, gql } from '@/__generated__'
import { useQuery } from '@apollo/client'
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

const client = initializeApollo()

interface Props {}

export default function Directory() {
  const { data, loading, fetchMore } = useQuery<
    DirectoryIndexPageGetDataQuery,
    DirectoryIndexPageGetDataQueryVariables
  >(directoryIndexPageGetData, {
    client,
    variables: defaultQueryVariables,
    notifyOnNetworkStatusChange: true,
  })

  const directory = getFragmentData(DirectoryIndexPageEntry, data?.directory)

  const handleIntersect = () => {
    if (loading) return

    const directoryMetadata = getFragmentData(
      DirectoryIndexPageMetadata,
      data?.directoryMetadata,
    )

    const directoryCurrentLength = directory?.length || 0
    const directoryTotalLength = directoryMetadata?.count || 0

    if (directoryCurrentLength >= directoryTotalLength) return

    fetchMore({
      variables: {
        ...defaultQueryVariables,
        skip: directoryCurrentLength,
      },
    })
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

export const DirectoryIndexPageEntry = gql(/* GraphQL */ `
  fragment DirectoryIndexPageEntry on GlossaryEntryRecord {
    id
    ...CompanyCardCompany
  }
`)

export const DirectoryIndexPageMetadata = gql(/* GraphQL */ `
  fragment DirectoryIndexPageMetadata on CollectionMetadata {
    count
  }
`)
