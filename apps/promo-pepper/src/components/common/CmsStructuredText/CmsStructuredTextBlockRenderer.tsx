import { makeFragment } from '@/lib/apollo'
import {
  CmsImageFragmentDoc,
  CmsStructuredTextImageRecordFragment,
} from '@/__generated__/graphql'
import { gql } from '@apollo/client'
import React from 'react'
import { RenderBlockContext } from 'react-datocms'
import CmsImage from '../CmsImage'

interface Props {
  context: RenderBlockContext<CmsStructuredTextImageRecordFragment>
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
  record: CmsStructuredTextImageRecordFragment
}) {
  const cmsImage = makeFragment(
    CmsImageFragmentDoc,
    record.image?.responsiveImage,
  )

  if (!cmsImage) {
    return null
  }

  return (
    <div className="prose-img:mt-0 rounded-md overflow-hidden">
      <CmsImage data={cmsImage} layout="responsive" />
    </div>
  )
}
CmsStructuredTextBlockRenderer.fragments = {
  image: gql`
    ${CmsImage.fragments.image}
    fragment CmsStructuredTextImageRecord on ImageRecord {
      id
      image {
        id
        responsiveImage {
          ...CmsImage
        }
      }
    }
  `,
}
