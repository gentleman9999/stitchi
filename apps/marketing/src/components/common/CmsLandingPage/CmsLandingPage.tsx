import { gql } from '@apollo/client'
import { CmsLandingPageLandingPageFragment } from '@generated/CmsLandingPageLandingPageFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import React from 'react'
import CmsSeo from '../CmsSeo'
import CmsLandingPageCallToAction from './CmsLandingPageCallToAction'
import CmsLandingPageCatalogSection from './CmsLandingPageCatalogSection'
import CmsLandingPageHero, {
  Props as CmsLandingPageHeroProps,
} from './CmsLandingPageHero'
import CmsLandingPageSection from './CmsLandingPageSection'

interface Props {
  landingPage: CmsLandingPageLandingPageFragment
}

const CmsLandingPage = ({ landingPage }: Props) => {
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

CmsLandingPage.fragments = {
  landingPage: gql`
    ${CmsLandingPageSection.fragments.section}
    ${CmsLandingPageCallToAction.fragments.callToAction}
    ${CmsLandingPageCatalogSection.fragments.catalogSection}
    ${CmsSeo.fragments.seoTags}
    fragment CmsLandingPageLandingPageFragment on LandingPageRecord {
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

export default CmsLandingPage
