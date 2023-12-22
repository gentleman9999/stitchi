'use client'

import { gql } from '@apollo/client'
import { CmsLandingPageV2Fragment } from '@generated/types'
import React from 'react'
import CmsSeo, { CmsSeoFragments } from '../CmsSeo'
import CmsLandingPageHero, {
  Props as CmsLandingPageHeroProps,
} from '../CmsLandingPage/CmsLandingPageHero'
import CmsLandingPageSection from '../CmsLandingPage/CmsLandingPageSection'
import CmsLandingPageCallToAction from '../CmsLandingPage/CmsLandingPageCallToAction'
import CmsLandingPageCatalogSection from '../CmsLandingPage/CmsLandingPageCatalogSection'
import { useLogger } from 'next-axiom'
import { formatTradeshowDate } from '@lib/cms-landing-page'
import Breadcrumbs, { BreadcrumbProps } from '../Breadcrumbs'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import Container from '@components/ui/Container'

export interface Props {
  landingPage: CmsLandingPageV2Fragment
  href: string
  parentBreadcrumbs?: BreadcrumbProps['breadcrumbs']
}

const CmsLandingPageV2 = ({ landingPage, href, parentBreadcrumbs }: Props) => {
  const logger = useLogger()

  const breadcrumbs = [
    ...(parentBreadcrumbs || []),
    {
      href,
      label: landingPage.title || '',
    },
  ]

  return (
    <div>
      {landingPage.slug ? (
        <CmsSeo
          seo={landingPage._seoMetaTags}
          canonicalUrl={makeAbsoluteUrl(href)}
        />
      ) : null}

      {breadcrumbs.length > 1 ? (
        <div className="mt-4">
          <Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </Container>
        </div>
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

CmsLandingPageV2.fragments = {
  landingPage: gql`
    ${CmsLandingPageSection.fragments.section}
    ${CmsLandingPageCallToAction.fragments.callToAction}
    ${CmsLandingPageCatalogSection.fragments.catalogSection}
    ${CmsSeoFragments.seoTags}
    fragment CmsLandingPageV2Fragment on LandingPageRecord {
      id
      slug
      title
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }

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
  `,
}

export default CmsLandingPageV2
