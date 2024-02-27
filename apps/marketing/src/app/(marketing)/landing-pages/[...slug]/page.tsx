import { gql } from '@apollo/client'
import {
  LandingPageGetDataQuery,
  LandingPageGetDataQueryVariables,
  LandingPageGetMetadataQuery,
  LandingPageGetMetadataQueryVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'
import { toNextMetadata } from 'react-datocms/seo'
import Container from '@components/ui/Container'
import Breadcrumbs from '@components/common/Breadcrumbs'
import { formatTradeshowDate } from '@lib/cms-landing-page'
import CmsLandingPageHero, {
  Props as CmsLandingPageHeroProps,
} from './components/CmsLandingPageHero'
import CmsLandingPageSection from './components/CmsLandingPageSection'
import CmsLandingPageCallToAction from './components/CmsLandingPageCallToAction'
import CmsLandingPageCatalogSection, {
  fragments as cmsLandingPageCatalogSectionFragments,
} from './components/CmsLandingPageCatalogSection'
import { Logger } from 'next-axiom'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import { getClient } from '@lib/apollo-rsc'

interface Params {
  slug: string[]
}

const generateMetadata = async ({ params }: { params: Params }) => {
  const client = await getClient()

  const { data } = await client.query<
    LandingPageGetMetadataQuery,
    LandingPageGetMetadataQueryVariables
  >({
    query: GET_METADATA,
    variables: { slug: params.slug[params.slug.length - 1] },
  })

  return toNextMetadata(data.landingPage?._seoMetaTags || [])
}

const Page = async ({ params }: { params: Params }) => {
  const logger = new Logger()

  const client = await getClient()

  const { data } = await client.query<
    LandingPageGetDataQuery,
    LandingPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: { slug: params.slug[params.slug.length - 1] },
  })

  const landingPage = data.landingPage

  if (!landingPage) {
    logger.error('Landing page not found')
    notFound()
  }

  let parentBreadcrumb

  if (landingPage.category) {
    switch (landingPage.category) {
      case 'tradeshow':
        parentBreadcrumb = {
          href: routes.internal.tradeshows.href(),
          label: 'Tradeshows',
        }
        break

      case 'conference':
        parentBreadcrumb = {
          href: routes.internal.conferences.href(),
          label: 'Conferences',
        }
        break

      case 'insight':
        parentBreadcrumb = {
          href: routes.internal.insights.href(),
          label: 'Insights',
        }
        break

      case 'industry':
        parentBreadcrumb = {
          href: routes.internal.industries.href(),
          label: 'Industries',
        }
        break
    }
  }

  const breadcrumbs = [
    parentBreadcrumb,
    {
      href: params.slug.join('/'),
      label: landingPage.title || '',
      hidden: !parentBreadcrumb,
    },
  ].filter(notEmpty)

  return (
    <div>
      <div className="mt-4">
        <Container>
          <Breadcrumbs useAppDir breadcrumbs={breadcrumbs} />
        </Container>
      </div>

      {landingPage.content.map(content => {
        switch (content.__typename) {
          case 'PageHeroRecord':
            let ctas: CmsLandingPageHeroProps['ctas'] = []

            for (const cta of content.callToActions) {
              if (cta.url && cta.label) {
                ctas.push({
                  children: cta.label,
                  url: cta.url,
                  iconId: cta.icon[0]?.tag,
                })
              }
            }

            // Even though we receive an array, it should always be at most a single item
            const metadata = landingPage.categoryMetadata?.[0]

            let overline

            if (
              metadata?.__typename === 'TradeshowCategoryMetadataModelRecord'
            ) {
              overline = formatTradeshowDate(
                metadata.startDate,
                metadata.endDate,
              )
            }

            return (
              <CmsLandingPageHero
                key={content.id}
                title={content.title}
                ctas={ctas}
                overline={overline}
                description={
                  content.description ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.description,
                      }}
                    />
                  ) : null
                }
              />
            )

          case 'PageSectionRecord':
            return <CmsLandingPageSection key={content.id} section={content} />

          case 'PageCallToActionRecord':
            return (
              <CmsLandingPageCallToAction
                key={content.id}
                callToAction={content}
              />
            )

          case 'PageSectionCatalogRecord':
            return (
              <CmsLandingPageCatalogSection
                key={content.id}
                catalogSection={content}
              />
            )

          default:
            logger.error(
              `Unsupported content type: ${(content as any).__typename}`,
            )
        }
      })}
    </div>
  )
}

type Breadcrumb = {
  name: string
  path: string
}

function createBreadcrumbs(
  path: string,
  acc: Breadcrumb[] = [],
  currentIndex: number = 0,
): Breadcrumb[] {
  // Split the path into components if it's the first call (currentIndex will be 0)
  const components =
    currentIndex === 0
      ? path.split('/').filter(Boolean)
      : acc[acc.length - 1].path.split('/').filter(Boolean)

  // Base case: If there are no components left, return the accumulator
  if (currentIndex >= components.length) return acc

  // Build the current path up to the current index
  const currentPath = '/' + components.slice(0, currentIndex + 1).join('/')

  // Create the breadcrumb item for the current index
  const breadcrumb: Breadcrumb = {
    name: components[currentIndex],
    path: currentPath,
  }

  // Recursively call the function with the next index
  return createBreadcrumbs(path, [...acc, breadcrumb], currentIndex + 1)
}

const GET_METADATA = gql`
  query LandingPageGetMetadataQuery($slug: String!) {
    landingPage(filter: { slug: { eq: $slug } }) {
      id
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`

const GET_DATA = gql`
  ${CmsLandingPageSection.fragments.section}
  ${CmsLandingPageCallToAction.fragments.callToAction}
  ${cmsLandingPageCatalogSectionFragments.catalogSection}
  query LandingPageGetDataQuery($slug: String!) {
    landingPage(filter: { slug: { eq: $slug } }) {
      id
      slug
      title
      category
      categoryMetadata {
        ... on TradeshowCategoryMetadataModelRecord {
          id
          startDate
          endDate
        }
      }

      content {
        ... on PageHeroRecord {
          id

          title
          description

          callToActions {
            id
            label
            url
            icon {
              id
              tag
            }
          }
        }

        ... on PageSectionRecord {
          id
          ...CmsLandingPageSectionSectionFragment
        }

        ... on PageCallToActionRecord {
          id
          ...CmsLandingPageCallToActionCallToActionFragment
        }

        ... on PageSectionCatalogRecord {
          id
          ...CmsLandingPageCatalogSectionCatalogSectionFragment
        }
      }
    }
  }
`
export default Page
export { generateMetadata }
