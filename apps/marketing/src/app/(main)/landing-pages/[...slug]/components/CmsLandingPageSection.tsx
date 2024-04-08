import React from 'react'
import cx from 'classnames'
import Section from '@components/common/Section'
import SectionHeader from '@components/common/SectionHeader'
import { gql } from '@apollo/client'
import FeatureGrid, { Props as FeatureGridProps } from './FeatureGrid'
import Container from '@components/ui/Container'
import CmsImage, { CmsImageFragments } from '@components/common/CmsImage'
import FAQGroup, { Props as FAQGroupProps } from './FAQGroup'
import { Logger } from 'next-axiom'
import LandingPageGrid, {
  Props as LandingPageGridProps,
} from './LandingPageGrid'
import { CmsLandingPageSectionSectionFragment } from '@generated/types'
import { formatTradeshowDate, getHref } from '@lib/cms-landing-page'
import CmsStructuredText from '@components/common/CmsStructuredText'

interface Props {
  section: CmsLandingPageSectionSectionFragment
}

const CmsLandingPageSection = ({ section }: Props) => {
  const logger = new Logger()
  const {
    title,
    subtitle,
    content,
    gutter,
    image,
    imageAlignment = 'center',
    textAlignment = 'center',
  } = section

  return (
    <Container>
      <Section gutter={gutter === 'none' ? undefined : (gutter as any)}>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {image?.responsiveImage ? (
            <div
              className={cx('flex-1 max-w-lg hidden lg:block', {
                '!hidden': imageAlignment !== 'left',
              })}
            >
              <CmsImage data={image.responsiveImage} />
            </div>
          ) : null}

          <div className="flex-1 w-full">
            <SectionHeader
              align={textAlignment as any}
              title={
                title ? (
                  <div dangerouslySetInnerHTML={{ __html: title }} />
                ) : null
              }
              subtitle={
                subtitle ? (
                  <div dangerouslySetInnerHTML={{ __html: subtitle }} />
                ) : null
              }
            />

            {image?.responsiveImage ? (
              <CmsImage
                data={image.responsiveImage}
                className={cx('mt-8 sm:mt-10 md:mt-12 lg:mt-16 m-auto', {
                  'lg:hidden': imageAlignment !== 'center',
                })}
              />
            ) : null}

            <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16">
              {content.map(content => {
                switch (content.__typename) {
                  case 'FeatureGridRecord':
                    const features: FeatureGridProps['features'] = []

                    for (const feature of content.features) {
                      if (feature.name) {
                        features.push({
                          name: feature.name,
                          shortDescription: feature.shortDescription,
                          iconTag: feature.icon[0]?.tag,
                          ctaText: feature.callToActionText,
                          ctaUrl: feature.callToActionUrl,
                        })
                      }
                    }

                    return <FeatureGrid features={features} />

                  case 'FaqGroupRecord':
                    const faqs: FAQGroupProps['faqs'] = []

                    for (const faq of content.faqs) {
                      if (faq.question && faq.answer) {
                        faqs.push({
                          id: faq.id,
                          answer: faq.answer,
                          question: faq.question,
                        })
                      }
                    }

                    return (
                      <FAQGroup faqs={faqs} expandAll={content.expandAll} />
                    )

                  case 'RichContentRecord':
                    if (!content.content) return null

                    return (
                      <div className="prose prose-lg prose-fuchsia m-auto">
                        <CmsStructuredText content={content.content} />
                      </div>
                    )
                  case 'LandingPageGridRecord':
                    const landingPages: LandingPageGridProps['landingPages'] =
                      []

                    for (const link of content.landingPages) {
                      const { title, landingPage } = link

                      if (!landingPage) continue

                      const { slug, category, categoryMetadata } = landingPage

                      // Even though we receive an array, it should always be at most a single item
                      const metadata = categoryMetadata?.[0]

                      let subtitle

                      if (
                        metadata?.__typename ===
                        'TradeshowCategoryMetadataModelRecord'
                      ) {
                        subtitle = formatTradeshowDate(
                          metadata.startDate,
                          metadata.endDate,
                        )
                      }

                      if (title && slug && category) {
                        landingPages.push({
                          title,
                          subtitle,
                          href: getHref({ category, slug }),
                        })
                      }
                    }

                    return <LandingPageGrid landingPages={landingPages} />

                  default:
                    logger.error(
                      `Unsupported content type: ${
                        (content as any).__typename
                      }`,
                    )
                }
              })}
            </div>
          </div>

          {image?.responsiveImage ? (
            <div
              className={cx('flex-1 max-w-lg hidden lg:block', {
                '!hidden': imageAlignment !== 'right',
              })}
            >
              <CmsImage data={image.responsiveImage} />
            </div>
          ) : null}
        </div>
      </Section>
    </Container>
  )
}

CmsLandingPageSection.fragments = {
  section: gql`
    ${CmsImageFragments.image}
    ${CmsStructuredText.fragments.richContentRecord}
    fragment CmsLandingPageSectionSectionFragment on PageSectionRecord {
      id
      title
      subtitle
      gutter
      textAlignment
      imageAlignment
      image {
        id
        responsiveImage {
          ...CmsImageFragment
        }
      }

      content {
        ... on RichContentRecord {
          id
          content {
            ...CmsStructuredTextRichContentRecordFragment
          }
        }

        ... on FeatureGridRecord {
          id

          features {
            id
            name
            shortDescription
            callToActionText
            callToActionUrl
            icon {
              id
              tag
            }
          }
        }

        ... on FaqGroupRecord {
          id
          expandAll
          faqs {
            id
            question
            answer
          }
        }

        ... on LandingPageGridRecord {
          id
          landingPages {
            id
            title

            landingPage {
              ... on LandingPageRecord {
                id
                slug
                category

                categoryMetadata {
                  ... on TradeshowCategoryMetadataModelRecord {
                    id
                    startDate
                    endDate
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
}

export default CmsLandingPageSection
