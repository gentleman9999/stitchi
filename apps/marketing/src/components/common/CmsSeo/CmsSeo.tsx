import { gql } from '@apollo/client'
import { CmsSeoTagsFragment } from '@generated/CmsSeoTagsFragment'
import Head from 'next/head'
import React from 'react'
import { renderMetaTags } from 'react-datocms'

export interface CmsSeoProps {
  seo: CmsSeoTagsFragment[]
}

const CmsSeo = ({ seo }: CmsSeoProps) => {
  return <Head>{renderMetaTags([...seo])}</Head>
}

CmsSeo.fragments = {
  seoTags: gql`
    fragment CmsSeoTagsFragment on Tag {
      attributes
      content
      tag
    }
  `,
}

export default CmsSeo
