import { CmsSeoTagsFragment } from '@generated/CmsSeoTagsFragment'
import Head from 'next/head'
import React from 'react'
import { CmsSeo } from '..'

export interface SeoDefaultProps {
  seo: CmsSeoTagsFragment[]
}

const SeoDefault = (props: SeoDefaultProps) => {
  return (
    <>
      <CmsSeo seo={props.seo} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  )
}

export default SeoDefault
