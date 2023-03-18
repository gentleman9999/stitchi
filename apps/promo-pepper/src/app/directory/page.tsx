import { SearchBar } from '@/components/common'
import { Container } from '@/components/ui'
import { initializeApollo } from '@/lib/apollo'
import { gql } from '@/__generated__'
import {
  DirectoryIndexPageGetDataQuery,
  DirectoryIndexPageGetDataQueryVariables,
} from '@/__generated__/graphql'
import { notFound } from 'next/navigation'
import React from 'react'
import Filters from './Filters'
import Temp from './Temp'

export default async function Directory() {
  const client = initializeApollo()

  const { data } = await client.query<
    DirectoryIndexPageGetDataQuery,
    DirectoryIndexPageGetDataQueryVariables
  >({
    query: DirectoryIndexPageGetDataQuery,
    variables: {
      first: 20,
      filter: { entryType: { eq: 'company' } },
    },
  })

  if (!data.directory) {
    notFound()
  }

  return (
    <>
      <Container>
        <div className="py-20">
          <h1 className="text-7xl font-bold max-w-2xl font-headingDisplay">
            Discover the internet&apos;s best merch and how its made
          </h1>
        </div>
        <Temp />
      </Container>
    </>
  )
}

const DirectoryIndexPageGetDataQuery = gql(/* GraphQL */ `
  query DirectoryIndexPageGetData(
    $first: IntType
    $skip: IntType
    $filter: GlossaryEntryModelFilter
  ) {
    directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {
      id
    }
  }
`)
