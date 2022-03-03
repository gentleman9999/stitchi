import { gql } from '@apollo/client'
import { CmsStructuredTextCategoryDescriptionFragment } from '@generated/CmsStructuredTextCategoryDescriptionFragment'
import { CmsStructuredTextContentFragment } from '@generated/CmsStructuredTextContentFragment'
import { CmsStructuredTextPrivacyPolicyContentFragment } from '@generated/CmsStructuredTextPrivacyPolicyContentFragment'
import { CmsStructuredTextTermsOfUseContentFragment } from '@generated/CmsStructuredTextTermsOfUseContentFragment'
import routes from '@lib/routes'
import { anchorTagFromNode } from '@utils/structured-text'
import { isLink, isHeading } from 'datocms-structured-text-utils'
import Link from 'next/link'
import { StructuredText, renderNodeRule } from 'react-datocms'

interface Props {
  content:
    | CmsStructuredTextContentFragment
    | CmsStructuredTextCategoryDescriptionFragment
    | CmsStructuredTextPrivacyPolicyContentFragment
    | CmsStructuredTextTermsOfUseContentFragment
}

const CmsStructuredText = ({ content }: Props) => {
  return (
    <StructuredText
      data={content as any}
      customRules={[
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
            <HeadingTag key={key}>
              {children} <a id={anchor} />
              <a href={`#${anchor}`} />
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
                <a>{record.title as string}</a>
              </Link>
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
    fragment CmsStructuredTextContentFragment on ArticleModelContentField {
      value
      blocks
      links {
        ... on ArticleRecord {
          id
          slug
          title
        }
      }
    }
  `,
  privacyPolicyContent: gql`
    fragment CmsStructuredTextPrivacyPolicyContentFragment on PrivacyPolicyPageModelContentField {
      value
      blocks
    }
  `,
  termsOfUseContent: gql`
    fragment CmsStructuredTextTermsOfUseContentFragment on TermsOfUsePageModelContentField {
      value
      blocks
    }
  `,
  categoryDescription: gql`
    fragment CmsStructuredTextCategoryDescriptionFragment on CategoryModelDescriptionField {
      value
      blocks
    }
  `,
}

export default CmsStructuredText
