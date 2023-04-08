import { FragmentType, getFragmentData, gql } from '@/__generated__'
import React from 'react'
import { RenderBlockContext } from 'react-datocms'
import CmsImage from '../CmsImage'

interface Props {
  context: RenderBlockContext<any>
}

export default function CmsStructuredTextBlockRenderer(props: Props) {
  const { record } = props.context

  switch (record.__typename) {
    case 'ImageRecord':
      return <ImageRecordRenderer record={record} />

    default:
      throw new Error(`Invalid record type: ${record.__typename}`)
  }
}

function ImageRecordRenderer({
  record,
}: {
  record: FragmentType<typeof CmsStructuredTextImageRecordFragment>
}) {
  const imageRecord = getFragmentData(
    CmsStructuredTextImageRecordFragment,
    record,
  )

  if (!imageRecord.image?.responsiveImage) {
    return null
  }

  return (
    <div className="prose-img:mt-0 rounded-md overflow-hidden">
      <CmsImage data={imageRecord.image?.responsiveImage} layout="responsive" />
    </div>
  )
}

export const CmsStructuredTextImageRecordFragment = gql(/* GraphQL */ `
  fragment CmsStructuredTextImageRecord on ImageRecord {
    id
    image {
      id
      responsiveImage {
        ...CmsImage
      }
    }
  }
`)
