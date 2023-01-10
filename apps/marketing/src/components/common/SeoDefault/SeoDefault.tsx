import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import Head from 'next/head'
import React from 'react'
import { CmsSeo, CmsSeoProps } from '..'

export interface SeoDefaultProps {
  seo: CmsSeoProps['seo']
}

const SeoDefault = (props: SeoDefaultProps) => {
  return (
    <>
      <CmsSeo
        seo={props.seo}
        canonicalUrl={makeAbsoluteUrl(routes.internal.home.href())}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  )
}

export default SeoDefault
