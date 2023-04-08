import { Skeleton } from '@/components/ui'
import routes from '@/lib/routes'
import { capitalize } from '@/utils/strings'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  loading: boolean
  issue?: FragmentType<typeof IssueCardIssue> | null
}

export default function IssueCard({ loading, issue: issueFragment }: Props) {
  const issue = getFragmentData(IssueCardIssue, issueFragment)

  if (!issue && !loading) {
    return null
  }

  return (
    <li className="flex flex-col gap-2 sm:gap-4 md:gap-6 sm:flex-row p-2 sm:border rounded-md w-full">
      {!loading && issue?.thumbnailUrl ? (
        <Link
          href={routes.internal.newsletter.issues.show.href({
            issueSlug: issue.slug,
          })}
        >
          <div className="shadow-xl rounded-md">
            <div className="border sm:border-none relative h-52 sm:h-40 md:h-52 w-full sm:w-60 md:w-72 rounded-md overflow-hidden">
              <Image
                fill
                src={issue.thumbnailUrl}
                alt={`${issue.title} thumbnail`}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </Link>
      ) : null}
      {loading ? (
        <div className="relative h-52 w-72 rounded-sm overflow-hidden bg-gray-200" />
      ) : null}
      <div className="flex flex-col gap-2 flex-1">
        <div>
          <span className="text-gray-700 text-sm">
            {loading ? (
              <Skeleton width="20%" height={10} />
            ) : issue ? (
              <>
                {capitalize(
                  formatDistanceToNow(
                    new Date(issue.publishedAt || issue.createdAt),
                    {
                      addSuffix: true,
                    },
                  ),
                )}
              </>
            ) : null}
          </span>
          {loading ? (
            <Skeleton width="70%" height={30} />
          ) : issue ? (
            <Link
              href={routes.internal.newsletter.issues.show.href({
                issueSlug: issue.slug,
              })}
            >
              <h2 className="text-2xl lg:text-3xl font-bold font-headingDisplay hover:underline decoration-primary">
                {issue.title}
              </h2>
            </Link>
          ) : null}
        </div>
        <p className="text-gray-800">
          {loading ? <Skeleton width="90%" /> : issue ? issue.subtitle : null}
        </p>

        {loading ? (
          <Skeleton width="20%" />
        ) : issue?.authorNames.length ? (
          <p>{issue.authorNames.join(', ')}</p>
        ) : null}
      </div>
    </li>
  )
}

export const IssueCardIssue = gql(/* GraphQL */ `
  fragment IssueCardIssue on NewsletterIssue {
    id
    slug
    title
    subtitle
    thumbnailUrl
    authorNames
    createdAt
    publishedAt
  }
`)
