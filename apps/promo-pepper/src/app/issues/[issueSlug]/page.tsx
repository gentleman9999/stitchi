import { Container } from '@/components/ui'
import { initializeApollo } from '@/lib/apollo'
import { gql } from '@/__generated__'
import {
  GetNewsletterIssueDataQuery,
  GetNewsletterIssueDataQueryVariables,
} from '@/__generated__/graphql'
import Image from 'next/image'
import React from 'react'
import { parse, HTMLElement } from 'node-html-parser'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { notEmpty } from '@/utils/typescript'
import getOrThrow from '@/utils/get-or-throw'
import makeAbsoluteUrl from '@/utils/get-absolute-url'
import routes from '@/lib/routes'

const twitterHandle = getOrThrow(
  process.env.NEXT_PUBLIC_TWITTER_HANDLE,
  'NEXT_PUBLIC_TWITTER_HANDLE',
)

const siteName = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_NAME,
  'NEXT_PUBLIC_SITE_NAME',
)

interface Params {
  issueSlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const { issueSlug } = params
  const client = initializeApollo()

  const { data, error } = await client.query<
    GetNewsletterIssueDataQuery,
    GetNewsletterIssueDataQueryVariables
  >({ query: GetNewsletterIssueData, variables: { slug: issueSlug } })

  const issue = data.newsletter?.newsletterIssue

  return {
    title: issue?.title,
    description: issue?.subtitle,
    publisher: 'PromoPepper',
    openGraph: {
      type: 'article',
      title: issue?.title,
      description: issue?.subtitle,
      images: issue?.thumbnailUrl
        ? [{ url: issue.thumbnailUrl, alt: issue.title }]
        : [],
      authors: issue?.authorNames.filter(notEmpty),
      publishedTime: issue?.publishedAt ?? undefined,
      siteName: siteName,
      url: makeAbsoluteUrl(
        routes.internal.newsletter.issues.show.href({ issueSlug }),
      ),
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${twitterHandle}`,
      creator: `@${twitterHandle}`,
      description: issue?.subtitle,
      title: issue?.title,
      images: issue?.thumbnailUrl
        ? [{ url: issue.thumbnailUrl, alt: issue.title }]
        : [],
    },
    authors: issue?.authorNames
      ?.map(name => (name ? { name } : null))
      .filter(notEmpty),
  }
}

export default async function Page({ params }: { params: Params }) {
  const { issueSlug } = params

  const client = initializeApollo()

  const { data, error } = await client.query<
    GetNewsletterIssueDataQuery,
    GetNewsletterIssueDataQueryVariables
  >({ query: GetNewsletterIssueData, variables: { slug: issueSlug } })

  if (error) {
    console.error(error)
    return notFound()
  }

  const { newsletterIssue: issue } = data?.newsletter || {}

  const postHtml = parseHtml(issue?.contentHtml)

  if (!issue || !postHtml) {
    return notFound()
  }

  return (
    <Container className="!max-w-4xl">
      <section className="py-8 sm:py-14 md:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold font-headingDisplay">
          {issue.title}
        </h1>
        {<p className="text-lg">{issue.subtitle}</p>}
        {issue.thumbnailUrl ? (
          <div className="rounded-md shadow-xl n mt-4">
            <div className="relative w-full h-64  sm:h-96 rounded-md overflow-hidden">
              <Image
                fill
                src={issue.thumbnailUrl}
                alt={issue.title}
                style={{ objectFit: 'cover' }}
              />
            </div>
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

const GetNewsletterIssueData = gql(/* GraphQL */ `
  query GetNewsletterIssueData($slug: String!) {
    newsletter {
      newsletterIssue(slug: $slug) {
        id
        title
        subtitle
        thumbnailUrl
        contentHtml
        authorNames
        publishedAt
      }
    }
  }
`)
