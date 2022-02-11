import { gql } from '@apollo/client'
import { CmsStructuredTextCategoryDescriptionFragment } from '@generated/CmsStructuredTextCategoryDescriptionFragment'
import { CmsStructuredTextContentFragment } from '@generated/CmsStructuredTextContentFragment'
import { CmsStructuredTextPrivacyPolicyContentFragment } from '@generated/CmsStructuredTextPrivacyPolicyContentFragment'
import { CmsStructuredTextTermsOfUseContentFragment } from '@generated/CmsStructuredTextTermsOfUseContentFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import { StructuredText } from 'react-datocms'

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
      renderLinkToRecord={({ record }) => {
        switch (record.__typename) {
          case 'ArticleRecord':
            return (
              <Link
                href={routes.internal.blog.show.href(record.slug as string)}
              >
                <a>{record.title}</a>
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
