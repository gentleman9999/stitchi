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
    <li className="flex flex-col gap-8 sm:flex-row overflow-hidden p-2 border border-gray-800 rounded-md">
      {issue?.thumbnailUrl ? (
        <Link
          href={routes.internal.newsletter.issues.show.href({
            issueSlug: issue.slug,
          })}
        >
          <div className="relative h-52 w-72 rounded-sm overflow-hidden">
            <Image
              fill
              src={issue.thumbnailUrl}
              alt={`${issue.title} thumbnail`}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </Link>
      ) : null}
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-gray-700 text-sm">
            {loading ? (
              <Skeleton />
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
            <Skeleton />
          ) : issue ? (
            <Link
              href={routes.internal.newsletter.issues.show.href({
                issueSlug: issue.slug,
              })}
            >
              <h2 className="text-3xl font-bold font-headingDisplay hover:underline">
                {issue.title}
              </h2>
            </Link>
          ) : null}
        </div>
        <p className="text-gray-800">
          {loading ? <Skeleton /> : issue ? issue.subtitle : null}
        </p>

        {loading ? (
          <Skeleton />
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
