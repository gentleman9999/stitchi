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
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import routes from '@lib/routes'

interface Props {
  landingPage: CmsLandingPageV2Fragment
  canonicalUrl: string
}

const CmsLandingPageV2 = ({ landingPage, canonicalUrl }: Props) => {
  const logger = useLogger()
  return (
    <div>
      {landingPage.slug ? (
        <CmsSeo seo={landingPage._seoMetaTags} canonicalUrl={canonicalUrl} />
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
  `,
}

export default CmsLandingPageV2
