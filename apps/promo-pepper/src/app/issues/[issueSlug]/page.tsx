'use client'

import { ComponentErrorMessage } from '@/components/common'
import { Container, Skeleton } from '@/components/ui'
import { initializeApollo } from '@/lib/apollo'
import { gql } from '@/__generated__'
import {
  GetNewsletterIssueDataQuery,
  GetNewsletterIssueDataQueryVariables,
} from '@/__generated__/graphql'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import React from 'react'
import { parse, HTMLElement } from 'node-html-parser'

const client = initializeApollo()

export default function Page({ params }: { params: { issueSlug: string } }) {
  const { issueSlug } = params

  const { data, loading, error } = useQuery<
    GetNewsletterIssueDataQuery,
    GetNewsletterIssueDataQueryVariables
  >(GetNewsletterIssueData, { client, variables: { slug: `${issueSlug}` } })

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  const { newsletterIssue: issue } = data?.newsletter || {}

  const postHtml = parseHtml(issue?.contentHtml)

  if (!loading && !postHtml) {
    return (
      <ComponentErrorMessage
        error={`Failed to load newsletter issue ${issueSlug}`}
      />
    )
  }

  return (
    <Container className="max-w-4xl">
      <section className="py-8 sm:py-14 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold font-headingDisplay">
          {loading ? <Skeleton /> : issue?.title}
        </h1>
        {loading ? <Skeleton /> : <p className="text-lg">{issue?.subtitle}</p>}
        {issue?.thumbnailUrl ? (
          <div className="relative w-full h-64  sm:h-96 rounded-md overflow-hidden mt-4">
            <Image
              fill
              src={issue.thumbnailUrl}
              alt={issue.title}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : null}
      </section>
      <section>
        {postHtml ? (
          <div
            className="prose sm:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: postHtml }}
          />
        ) : null}
      </section>
    </Container>
  )
}

function removeStyleFromAllNodes(element: HTMLElement) {
  // Remove the style attribute from the current element
  element.removeAttribute('style')

  // Loop through all child nodes
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i]

    // Check if the node is an element node
    if (node instanceof HTMLElement) {
      // Recursively remove the style attribute from all child elements
      removeStyleFromAllNodes(node)
    }
  }

  return element.toString()
}

const parseHtml = (html?: string | null) => {
  if (!html) {
    return null
  }

  try {
    return removeStyleFromAllNodes(parse(html).getElementById('content-blocks'))
  } catch (e) {
    console.log(e)
    return null
  }
}

const GetNewsletterIssueData = gql(`
    query GetNewsletterIssueData($slug: String!) {
        newsletter {
            newsletterIssue(slug: $slug) {
                id
                title
                subtitle
                thumbnailUrl
                contentHtml
            }
        }
    }
`)
