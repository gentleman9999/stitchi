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
import { anchorTagFromNode } from '@utils/structured-text'
import { isLink, isHeading } from 'datocms-structured-text-utils'
import Link from 'next/link'
import { StructuredText, renderNodeRule } from 'react-datocms'
import BlogPostCard from '../BlogPostCard'
import CmsImage from '../CmsImage'

interface Props {
  content:
    | CmsStructuredTextContentFragment
    | CmsStructuredTextCategoryDescriptionFragment
    | CmsStructuredTextPrivacyPolicyContentFragment
    | CmsStructuredTextTermsOfUseContentFragment
    | CmsStructuredTextGlossaryDescriptionFragment
}

const CmsStructuredText = ({ content }: Props) => {
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
                href={routes.internal.blog.show.href(record.slug as string)}
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
        if (!record) return null
        return (
          <div>
            <Link
              href={routes.internal.blog.show.href(record.slug as string)}
              className="no-underline rounded-md border p-2 flex flex-col gap-2 not-prose"
            >
              <h2 className="hover:underline leading-tight">
                {record.title as string}
              </h2>
              {(record.shortDescription as string) ? (
                <p className="text-xs font-normal">
                  {record.shortDescription as string}
                </p>
              ) : null}
            </Link>
          </div>
        )
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
              <div className="prose-img:mt-0 rounded-md overflow-hidden">
                <CmsImage
                  data={castedRecord.image.responsiveImage}
                  layout="responsive"
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
    ${CmsImage.fragments.image}
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
    ${CmsImage.fragments.image}
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
}

export default CmsStructuredText
