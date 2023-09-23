import React from 'react'
import cx from 'classnames'
import Section from '../Section'
import SectionHeader from '../SectionHeader'
import { gql } from '@apollo/client'
import { CmsLandingPageSectionSectionFragment } from '@generated/CmsLandingPageSectionSectionFragment'
import FeatureGrid, { Props as FeatureGridProps } from './FeatureGrid'
import { Container } from '@components/ui'
import CmsImage from '../CmsImage'
import FAQGroup, { Props as FAQGroupProps } from './FAQGroup'
import { useLogger } from 'next-axiom'

interface Props {
  section: CmsLandingPageSectionSectionFragment
}

const CmsLandingPageSection = ({ section }: Props) => {
  const logger = useLogger()
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

          <div className="flex-1">
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
                className={cx('mt-8 sm:mt-10 md:mt-12 lg:mt-16', {
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
    ${CmsImage.fragments.image}
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
      }
    }
  `,
}

export default CmsLandingPageSection
