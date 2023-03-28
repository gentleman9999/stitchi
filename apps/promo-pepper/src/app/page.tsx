'use client'

import { ComponentErrorMessage } from '@/components/common'
import { Container } from '@/components/ui'
import { initializeApollo } from '@/lib/apollo'
import { notEmpty } from '@/utils/typescript'
import { gql } from '@/__generated__'
import {
  GetHomePageDataQuery,
  GetHomePageDataQueryVariables,
} from '@/__generated__/graphql'
import { useQuery } from '@apollo/client'
import React from 'react'

const client = initializeApollo()

export default function Page() {
  const { data, loading, error } = useQuery<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >(GetHomePageData, { client, variables: {} })

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  const featuredIssues =
    data?.newsletter?.allNewsletterIssues?.nodes.filter(notEmpty) || []

  const handleSubmit = () => {}

  return (
    <>
      <section className="bg-primary py-28">
        <Container>
          <h1 className="text-4xl font-headingDisplay font-bold text-paper">
            The internet&apos;s leading destination for custom merch news and
            ratings
          </h1>
          <p className="text-paper text-xl mt-4">
            Get the weekly email that talks about the most important things
            happening in the promotional products industry. Stay informed and
            entertained, for free.
          </p>
          <form
            onSubmit={handleSubmit}
            className="rounded-md overflow-hidden inline-block mt-10 shadow-xl"
          >
            <label className="sr-only" htmlFor="name">
              Email address
            </label>
            <input
              required
              name="email"
              placeholder="youremail@example.com"
              className="py-3 px-6 rounded-l-md text-lg"
            />
            <button
              type="submit"
              className="bg-gray-700 text-white text-lg py-3 px-6 font-medium"
            >
              Try it
            </button>
          </form>
        </Container>
      </section>
      <Container>
        <section className="py-20">
          {featuredIssues.map(issue => (
            <div key={issue.id}>{issue.id}</div>
          ))}
        </section>
      </Container>
    </>
  )
}

const GetHomePageData = gql(`
    query GetHomePageData {
        newsletter {
            allNewsletterIssues(first: 5) {
                nodes {
                    id
                }
            }
        }
    }
`)
