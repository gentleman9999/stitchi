import { CmsStructuredTextContentFragment_blocks } from '@generated/CmsStructuredTextContentFragment'
import { CmsStructuredTextRichContentRecordFragment } from '@generated/types'

import { anchorTagFromNode } from '@lib/utils/structured-text'
import { isLink, isHeading } from 'datocms-structured-text-utils'
import Link from 'next/link'
import { StructuredText, renderNodeRule } from 'react-datocms'
import CmsResponsiveImage from './CmsResponsiveImage'
import { gql } from '@apollo/client'

interface Props {
  content: CmsStructuredTextRichContentRecordFragment
}

const CmsRichContentRecord = ({ content }: Props) => {
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
                <CmsResponsiveImage
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

CmsRichContentRecord.fragments = {
  richContentRecord: gql`
    ${CmsResponsiveImage.fragments.image}
    fragment CmsStructuredTextRichContentRecordFragment on RichContentModelContentField {
      value
      blocks {
        id
        ... on ImageRecord {
          image {
            id
            responsiveImage {
              ...CmsResponsiveImageFragment
            }
          }
        }
      }
    }
  `,
}

export default CmsRichContentRecord
