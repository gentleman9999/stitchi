import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import React from 'react'

export interface SeoDefaultProps {}

const SeoDefault = (props: SeoDefaultProps) => {
  const title = 'Custom Merch & Merch Programs'
  const description =
    'We craft personalized promotional merchandise, perfect for corporate events, startups, and fundraisers. Drive your brand visibility with our unique, high-quality customizable products distributed globally.'

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="%s | Stitchi"
        description={description}
        twitter={{
          handle: '@gostitchi',
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title,
          description,
          siteName: 'Stitchi',
          url: makeAbsoluteUrl(routes.internal.home.href()),
          images: [
            {
              url: 'https://www.datocms-assets.com/61029/1673022707-stitchi_sharing_image.png?auto=format&fit=max&w=1200',
              width: 1200,
              type: 'image/png',
              alt: 'Stitchi Cover Image',
            },
          ],
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  )
}

export default SeoDefault
