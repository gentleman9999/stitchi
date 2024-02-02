import { gql } from '@apollo/client'
import { CmsStructuredTextCategoryDescriptionFragment } from '@generated/CmsStructuredTextCategoryDescriptionFragment'
import {
  CmsStructuredTextContentFragment,
  CmsStructuredTextContentFragment_blocks,
} from '@generated/CmsStructuredTextContentFragment'
import { CmsStructuredTextGlossaryDescriptionFragment } from '@generated/CmsStructuredTextGlossaryDescriptionFragment'
import { CmsStructuredTextPrivacyPolicyContentFragment } from '@generated/CmsStructuredTextPrivacyPolicyContentFragment'
import { CmsStructuredTextTermsOfUseContentFragment } from '@generated/CmsStructuredTextTermsOfUseContentFragment'
import routes from '@lib/routes'
import { anchorTagFromNode } from '@lib/utils/structured-text'
import { isLink, isHeading } from 'datocms-structured-text-utils'
import { useLogger } from 'next-axiom'
import Link from 'next/link'
import { StructuredText, renderNodeRule } from 'react-datocms'
import CmsImage, { CmsImageFragments } from '../CmsImage'
import CampusMarketSizeCalculator from './CampusMarketSizeCalculator'
import TableRecord from './TableRecord'
import { CmsStructuredTextRichContentRecordFragment } from '@generated/types'

interface Props {
  content:
    | CmsStructuredTextContentFragment
    | CmsStructuredTextCategoryDescriptionFragment
    | CmsStructuredTextPrivacyPolicyContentFragment
    | CmsStructuredTextTermsOfUseContentFragment
    | CmsStructuredTextGlossaryDescriptionFragment
    | CmsStructuredTextRichContentRecordFragment
}

const CmsStructuredText = ({ content }: Props) => {
  const logger = useLogger()

  return (
    <StructuredText
      data={content as any}
      customNodeRules={[
        // Open links in new tab
        renderNodeRule(isLink, ({ node, children, key }) => {
          return (
            <a key={key} href={node.url} target="_blank" rel="noreferrer">
              {children}
            </a>
          )
        }),
        // Add HTML anchors to heading levels for in-page navigation
        renderNodeRule(isHeading, ({ node, children, key }) => {
          const HeadingTag = `h${node.level}` as keyof JSX.IntrinsicElements
          const anchor = anchorTagFromNode(node)

          return (
            <HeadingTag key={key} id={anchor}>
              {children}
            </HeadingTag>
          )
        }),
      ]}
      renderLinkToRecord={({ record }) => {
        switch (record.__typename) {
          case 'ArticleRecord':
            return (
              <Link
                href={routes.internal.learn.show.href(record.slug as string)}
              >
                {record.title as string}
              </Link>
            )
          case 'GlossaryEntryRecord':
            return (
              <Link
                href={routes.internal.glossary.show.href({
                  termSlug: record.slug as string,
                  termType: record.entryType as string,
                })}
              >
                {record.term as string}
              </Link>
            )

          default:
            throw new Error(`Invalid record type: ${record.__typename}`)
        }
      }}
      renderInlineRecord={({ record }) => {
        switch (record.__typename) {
          case 'TableRecord': {
            return <TableRecord table={record.table as any} />
          }

          case 'CustomComponentRecord': {
            switch (record.componentId) {
              case 'campus-market-size-calculor': {
                return <CampusMarketSizeCalculator />
              }

              default: {
                logger.error(`Invalid componentId: ${record.componentId}`)
              }
            }
          }

          default: {
            return (
              <Link
                href={routes.internal.learn.show.href(record.slug as string)}
                className="no-underline rounded-sm border p-2 md:p-4 lg:p-6 flex flex-col gap-2 md:gap-4 not-prose bg-gray-50"
              >
                <span className="hover:underline leading-tight font-bold text-sm md:text-lg">
                  {record.title as string}
                </span>
                {(record.shortDescription as string) ? (
                  <span className="text-xs md:text-sm font-normal">
                    {record.shortDescription as string}
                  </span>
                ) : null}
              </Link>
            )
          }
        }
      }}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'ImageRecord':
            // Right now DatoCMS scalars are returned as `any`. This is a workaround in the meantime
            const castedRecord =
              record as unknown as CmsStructuredTextContentFragment_blocks

            if (!castedRecord.image?.responsiveImage) {
              return null
            }
            return (
              <div className="prose-img:mt-0 rounded-sm overflow-hidden">
                <CmsImage
                  lazyLoad
                  data={castedRecord.image.responsiveImage}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            )

          default:
            throw new Error(`Invalid record type: ${record.__typename}`)
        }
      }}
    />
  )
}

CmsStructuredText.fragments = {
  articleContent: gql`
    ${CmsImageFragments.image}
    fragment CmsStructuredTextContentFragment on ArticleModelContentField {
      value
      blocks {
        id
        ... on ImageRecord {
          image {
            id
            responsiveImage {
              ...CmsImageFragment
            }
          }
        }
      }
      links {
        ... on ArticleRecord {
          id
          slug
          title
          shortDescription
        }
        ... on GlossaryEntryRecord {
          id
          slug
          term
          entryType
        }

        ... on TableRecord {
          id
          table
        }

        ... on CustomComponentRecord {
          id
          componentId
        }
      }
    }
  `,
  privacyPolicyContent: gql`
    fragment CmsStructuredTextPrivacyPolicyContentFragment on PrivacyPolicyPageModelContentField {
      value
    }
  `,
  termsOfUseContent: gql`
    fragment CmsStructuredTextTermsOfUseContentFragment on TermsOfUsePageModelContentField {
      value
    }
  `,
  categoryDescription: gql`
    fragment CmsStructuredTextCategoryDescriptionFragment on CategoryModelDescriptionField {
      value
    }
  `,
  glossaryEntryDescription: gql`
    ${CmsImageFragments.image}
    fragment CmsStructuredTextGlossaryDescriptionFragment on GlossaryEntryModelDescriptionField {
      value
      blocks {
        id
        ... on ImageRecord {
          image {
            id
            responsiveImage {
              ...CmsImageFragment
            }
          }
        }
      }
      links {
        ... on ArticleRecord {
          id
          slug
          title
        }
        ... on GlossaryEntryRecord {
          id
          slug
          term
        }
      }
    }
  `,

  richContentRecord: gql`
    fragment CmsStructuredTextRichContentRecordFragment on RichContentModelContentField {
      value
      blocks {
        id
        ... on ImageRecord {
          image {
            id
            responsiveImage {
              ...CmsImageFragment
            }
          }
        }
      }
    }
  `,
}

export default CmsStructuredText
