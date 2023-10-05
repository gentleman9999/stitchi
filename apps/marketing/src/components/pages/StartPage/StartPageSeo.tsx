import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { NextSeo } from 'next-seo'
import React from 'react'

interface Props {}

const StartPageSeo = (props: Props) => {
  const url = makeAbsoluteUrl(routes.internal.contact.href())
  return (
    <NextSeo
      title="Contact us to get started"
      description="We work with organization of all shapes and sizes to produce high-quality merch designed to increase revenue, awareness, or loyalty."
      canonical={url}
      openGraph={{ url }}
    />
  )
}

export default StartPageSeo
