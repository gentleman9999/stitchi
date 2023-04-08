import { initializeApollo } from '@/lib/apollo'
import routes from '@/lib/routes'
import makeAbsoluteUrl from '@/utils/get-absolute-url'
import { notEmpty } from '@/utils/typescript'
import { gql } from '@/__generated__'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET(request: Request) {
  const client = initializeApollo()

  const { data } = await client.query({ query: GetSitemapData })

  const issues =
    data?.newsletter?.allNewsletterIssues?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return getServerSideSitemap(
    issues.map(
      issue =>
        ({
          loc: makeAbsoluteUrl(
            routes.internal.newsletter.issues.show.href({
              issueSlug: issue.slug,
            }),
          ),
          lastmod: issue.publishedAt ?? undefined,
        } || []),
    ),
  )
}

const GetSitemapData = gql(/* GraphQL */ `
  query GetSitemapData {
    newsletter {
      allNewsletterIssues(first: 500) {
        edges {
          node {
            id
            slug
            publishedAt
          }
        }
      }
    }
  }
`)
