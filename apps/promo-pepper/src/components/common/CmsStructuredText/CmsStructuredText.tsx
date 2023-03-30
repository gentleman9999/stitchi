'use client'
import routes from '@/lib/routes'
import { isLink, isHeading, Node } from 'datocms-structured-text-utils'
import Link from 'next/link'
import { renderNodeRule } from 'react-datocms'
import { render as toPlainText } from 'datocms-structured-text-to-plain-text'
import CmsStructuredTextBlockRenderer from './CmsStructuredTextBlockRenderer'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import DatoCmsStructuredTextWrapper from '../DatoCmsStructuredTextWrapper'

export interface Props {
  content: FragmentType<typeof CmsStructuredTextGlossaryDescriptionFragment>
}

const CmsStructuredText = (props: Props) => {
  const content = getFragmentData(
    CmsStructuredTextGlossaryDescriptionFragment,
    props.content,
  )

  return (
    <DatoCmsStructuredTextWrapper
      data={content}
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
            return <>{record.title}</>
          case 'GlossaryEntryRecord':
            return record.slug ? (
              <Link
                href={routes.internal.directory.companies.show.href({
                  companySlug: record.slug,
                })}
              >
                {record.term}
              </Link>
            ) : null
          default:
            throw new Error(
              `Invalid record type: ${(record as any).__typename}`,
            )
        }
      }}
      renderBlock={context => (
        <CmsStructuredTextBlockRenderer context={context} />
      )}
    />
  )
}

const anchorTagFromNode = (node: Node) =>
  toPlainText(node)
    ?.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export const CmsStructuredTextGlossaryDescriptionFragment = gql(/* GraphQL */ `
  fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {
    __typename
    value
    blocks {
      id
      ... on ImageRecord {
        ...CmsStructuredTextImageRecord
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
`)

export default CmsStructuredText
