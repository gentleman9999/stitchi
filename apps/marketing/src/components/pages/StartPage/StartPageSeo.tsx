import routes from '@lib/routes'
import { NextSeo } from 'next-seo'
import React from 'react'

interface Props {}

const StartPageSeo = (props: Props) => {
  const url = routes.internal.getStarted.href()
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
