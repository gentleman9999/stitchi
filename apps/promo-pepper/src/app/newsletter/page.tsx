'use client'

import {
  ComponentErrorMessage,
  InfiniteScrollTrigger,
} from '@/components/common'
import { Container } from '@/components/ui'
import { initializeApollo } from '@/lib/apollo'
import { gql } from '@/__generated__'
import {
  GetNewsletterIssuesDataQuery,
  GetNewsletterIssuesDataQueryVariables,
} from '@/__generated__/graphql'
import { useQuery } from '@apollo/client'
import React from 'react'
import IssueCard from './IssueCard'

const client = initializeApollo()

export default function Page() {
  const { data, loading, error, fetchMore } = useQuery<
    GetNewsletterIssuesDataQuery,
    GetNewsletterIssuesDataQueryVariables
  >(GetNewsletterIssuesData, {
    client,
    variables: { first: 2 },
    notifyOnNetworkStatusChange: true,
  })

  const { allNewsletterIssues } = data?.newsletter || {}

  const { pageInfo } = allNewsletterIssues || {}

  const handleIntersect = () => {
    if (!loading && pageInfo?.hasNextPage && pageInfo.endCursor) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      })
    }
  }

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  return (
    <Container>
      <section className="py-8 sm:py-12 md:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-2xl font-headingDisplay">
          What&apos;s happening in promo?
        </h1>
      </section>
      <section>
        <ul className="flex flex-col gap-4 items-center">
          {allNewsletterIssues?.edges?.map(edge =>
            edge?.node ? (
              <div key={edge.node.id} className="w-full max-w-sm sm:max-w-none">
                <IssueCard
                  key={edge.node.id}
                  issue={edge.node}
                  loading={false}
                />
              </div>
            ) : null,
          )}
          {loading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <IssueCard key={index} loading={loading} />
              ))}
            </>
          ) : null}
        </ul>

        <InfiniteScrollTrigger onIntersect={handleIntersect} />
      </section>
    </Container>
  )
}

const GetNewsletterIssuesData = gql(/* GraphQL */ `
  query GetNewsletterIssuesData($first: Int!, $after: String) {
    newsletter {
      allNewsletterIssues(first: $first, after: $after) {
        edges {
          node {
            id
            ...IssueCardIssue
          }
        }

        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`)
