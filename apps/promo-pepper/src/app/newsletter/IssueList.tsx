'use client'

import {
  ComponentErrorMessage,
  InfiniteScrollTrigger,
} from '@/components/common'
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

export default function IssueList() {
  const { data, loading, error, fetchMore } = useQuery<
    GetNewsletterIssuesDataQuery,
    GetNewsletterIssuesDataQueryVariables
  >(GetNewsletterIssuesData, {
    client,
    // TODO: Right now we can't paginate this query properly, we need for Beehiiv to implement ordering by date descending
    variables: { first: 52 },
    notifyOnNetworkStatusChange: true,
  })

  const { allNewsletterIssues } = data?.newsletter || {}

  const { pageInfo } = allNewsletterIssues || {}

  const handleIntersect = () => {
    if (!loading && pageInfo?.hasNextPage && pageInfo.endCursor) {
      fetchMore({ variables: { after: pageInfo.endCursor } })
    }
  }

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  return (
    <section>
      <ul className="flex flex-col gap-4 items-center">
        {allNewsletterIssues?.edges?.map(edge =>
          edge?.node ? (
            <div key={edge.node.id} className="w-full max-w-sm sm:max-w-none">
              <IssueCard key={edge.node.id} issue={edge.node} loading={false} />
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
