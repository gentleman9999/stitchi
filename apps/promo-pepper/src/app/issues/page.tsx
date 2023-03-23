'use client'

import { InfiniteScrollTrigger } from '@/components/common'
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
  const { data, loading, fetchMore } = useQuery<
    GetNewsletterIssuesDataQuery,
    GetNewsletterIssuesDataQueryVariables
  >(GetNewsletterIssuesData, { client, variables: { first: 10 } })

  const { allNewsletterIssues } = data?.newsletter || {}

  const handleIntersect = () => {
    if (
      allNewsletterIssues.pageInfo.hasNextPage &&
      allNewsletterIssues.pageInfo.endCursor
    ) {
      fetchMore({
        variables: {
          after: allNewsletterIssues.pageInfo.endCursor,
        },
      })
    }
  }

  return (
    <Container>
      <section className="py-20">
        <h1 className="text-7xl font-bold max-w-2xl font-headingDisplay">
          What&apos;s happening in promo?
        </h1>
      </section>
      <section>
        {allNewsletterIssues?.nodes.length ? (
          <ul className="flex flex-col gap-4">
            {allNewsletterIssues.nodes.map(issue =>
              issue ? (
                <IssueCard key={issue.id} loading={loading} issue={issue} />
              ) : null,
            )}
          </ul>
        ) : null}
        <InfiniteScrollTrigger onIntersect={handleIntersect} />
      </section>
    </Container>
  )
}

const GetNewsletterIssuesData = gql(`
    query GetNewsletterIssuesData($first: Int!, $after: String) {
        newsletter {
            allNewsletterIssues(first: $first, after: $after) {
                nodes {
                    id
                   ...IssueCardIssue
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`)
