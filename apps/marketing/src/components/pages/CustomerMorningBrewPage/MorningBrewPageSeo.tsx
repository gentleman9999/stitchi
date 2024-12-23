import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { NextSeo } from 'next-seo'
import React from 'react'

interface Props {}

const MorningBrewPageSeo = (props: Props) => {
  const url = makeAbsoluteUrl(routes.internal.customers.morningBrew.href())
  return (
    <NextSeo
      title="Powering Morning Brew's newsletter referral program with custom swag"
      description="Morning Brew is a newsletter company that sends to more than 3
      million subscribers each day. We've overhauled their
      referral program to be completely automated and backed by a
      swag program."
      canonical={url}
      openGraph={{ url }}
    />
  )
}

export default MorningBrewPageSeo
