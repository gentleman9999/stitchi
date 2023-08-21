import { gql, useQuery } from '@apollo/client'
import { Container, LoadingDots } from '@components/ui'
import {
  IndustriesIndexPageGetDataQuery,
  IndustriesIndexPageGetDataQueryVariables,
} from '@generated/IndustriesIndexPageGetDataQuery'
import {
  IndustriesIndexPageGetPathDataQuery,
  IndustriesIndexPageGetPathDataQueryVariables,
} from '@generated/IndustriesIndexPageGetPathDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import CmsSeo from '../CmsSeo'
import ComponentErrorMessage from '../ComponentErrorMessage'
import CmsLandingPageCallToAction from './CmsLandingPageCallToAction'
import CmsLandingPageCatalogSection from './CmsLandingPageCatalogSection'
import CmsLandingPageHero, {
  Props as CmsLandingPageHeroProps,
} from './CmsLandingPageHero'
import CmsLandingPageSection from './CmsLandingPageSection'

export const makeGetStaticPaths =
  (category: string): GetStaticPaths =>
  async () => {
    const client = initializeApollo()

    const { data } = await client.query<
      IndustriesIndexPageGetPathDataQuery,
      IndustriesIndexPageGetPathDataQueryVariables
    >({
      query: GET_PATH_DATA,
      variables: {
        category,
      },
    })

    if (!data.allLandingPages) {
      throw new Error('No landing pages found')
    }

    let paths: GetStaticPathsResult['paths'] = []

    for (const page of data.allLandingPages) {
      if (page.slug) {
        paths.push({
          params: {
            landingPageSlug: page.slug,
          },
        })
      }
    }

    return {
      paths,
      fallback: 'blocking',
    }
  }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo()

  const { landingPageSlug } = params || {}

  if (typeof landingPageSlug !== 'string') {
    console.error('No landing page slug provided')
    return {
      notFound: true,
    }
  }

  await client.query<
    IndustriesIndexPageGetDataQuery,
    IndustriesIndexPageGetDataQueryVariables
  >({
    query: GET_PAGE_DATA,
    variables: {
      slug: landingPageSlug,
    },
  })

  return addApolloState(client, {
    props: {},
  })
}

interface Props {}

const CmsLandingPage = ({}: Props) => {
  const { query } = useRouter()

  const landingPageSlug = query.landingPageSlug as string

  const { data, loading, error } = useQuery<
    IndustriesIndexPageGetDataQuery,
    IndustriesIndexPageGetDataQueryVariables
  >(GET_PAGE_DATA, { variables: { slug: landingPageSlug } })

  if (error) {
    return (
      <Container>
        <ComponentErrorMessage error={error} />
      </Container>
    )
  }

  if (loading) {
    return <LoadingDots />
  }

  const { landingPage } = data || {}

  if (!landingPage) {
    return <ComponentErrorMessage error={'Landing page not found'} />
  }

  return (
    <div>
      {landingPage.slug ? (
        <CmsSeo
          seo={landingPage._seoMetaTags}
          canonicalUrl={makeAbsoluteUrl(
            routes.internal.industries.show.href(landingPage.slug),
          )}
        />
      ) : null}

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

            return (
              <CmsLandingPageHero
                key={content.id}
                title={content.title}
                ctas={ctas}
                description={
                  content.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: content.description }}
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
            console.error(
              `Unsupported content type: ${(content as any).__typename}`,
            )
        }
      })}
    </div>
  )
}

const GET_PAGE_DATA = gql`
  ${CmsLandingPageSection.fragments.section}
  ${CmsLandingPageCallToAction.fragments.callToAction}
  ${CmsLandingPageCatalogSection.fragments.catalogSection}
  ${CmsSeo.fragments.seoTags}
  query IndustriesIndexPageGetDataQuery($slug: String!) {
    landingPage(filter: { slug: { eq: $slug } }) {
      id
      slug
      _seoMetaTags {
        ...CmsSeoTagsFragment
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

const GET_PATH_DATA = gql`
  query IndustriesIndexPageGetPathDataQuery($category: String!) {
    allLandingPages(filter: { category: { eq: $category } }) {
      id
      slug
    }
  }
`

export default CmsLandingPage
