'use client'

import routes from '@/lib/routes'
import { CmsStructuredTextGlossaryDescriptionFragment } from '@/__generated__/graphql'
import { isLink, isHeading } from 'datocms-structured-text-utils'
import Link from 'next/link'
import { StructuredText, renderNodeRule } from 'react-datocms'
import { Node } from 'datocms-structured-text-utils'
import { render as toPlainText } from 'datocms-structured-text-to-plain-text'
import CmsStructuredTextBlockRenderer from './CmsStructuredTextBlockRenderer'
import { gql } from '@apollo/client'

export interface Props {
  content: CmsStructuredTextGlossaryDescriptionFragment
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
            return <>{record.title}</>
          case 'GlossaryEntryRecord':
            return (
              <Link
                href={routes.internal.directory.companies.show.href({
                  companySlug: record.slug as string,
                })}
              >
                {record.term as string}
              </Link>
            )
          default:
            throw new Error(`Invalid record type: ${record.__typename}`)
        }
      }}
      renderBlock={context => (
        <CmsStructuredTextBlockRenderer context={context as any} />
      )}
    />
  )
}

const anchorTagFromNode = (node: Node) =>
  toPlainText(node)
    ?.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

CmsStructuredText.fragments = {
  entryDescription: gql`
    ${CmsStructuredTextBlockRenderer.fragments.image}
    fragment CmsStructuredTextGlossaryDescription on GlossaryEntryModelDescriptionField {
      value
      blocks {
        id
        ...CmsStructuredTextImageRecord
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
