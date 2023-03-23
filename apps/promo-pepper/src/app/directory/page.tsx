import { Container } from '@/components/ui'
// import { initializeApollo } from '@/lib/apollo'
// import {
//   DirectoryIndexPageGetDataQuery,
//   DirectoryIndexPageGetDataQueryVariables,
// } from '@/__generated__/graphql'
// import { notFound } from 'next/navigation'
import React from 'react'
import Directory from './Directory'
// import {
//   defaultQueryVariables,
//   directoryIndexPageGetData,
// } from './directoryIndexPageGetData'

export default async function Page() {
  // const client = initializeApollo()

  // const { data } = await client.query<
  //   DirectoryIndexPageGetDataQuery,
  //   DirectoryIndexPageGetDataQueryVariables
  // >({
  //   query: directoryIndexPageGetData,
  //   variables: defaultQueryVariables,
  // })

  // if (!data.directory) {
  //   notFound()
  // }

  return (
    <>
      <Container>
        <div className="py-20">
          <h1 className="text-7xl font-bold max-w-2xl font-headingDisplay">
            Discover the companies behind the world&apos;s best products
          </h1>
        </div>
        <Directory />
      </Container>
    </>
  )
}
