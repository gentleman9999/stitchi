import { gql } from '@apollo/client'
import { CmsStructuredTextContentFragment } from '@generated/CmsStructuredTextContentFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import { StructuredText } from 'react-datocms'

interface Props {
  content: CmsStructuredTextContentFragment
}

const CmsStructuredText = ({ content }: Props) => {
  return (
    <div className="prose prose-fuchsia prose-lg">
      <StructuredText
        data={content as any}
        renderLinkToRecord={({ record }) => {
          console.log(record)
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
    </div>
  )
}

CmsStructuredText.fragments = {
  content: gql`
    fragment CmsStructuredTextContentFragment on ArticleModelContentField {
      value
      blocks {
        id
      }
      links {
        ... on ArticleRecord {
          id
          slug
          title
        }
      }
    }
  `,
}

export default CmsStructuredText
