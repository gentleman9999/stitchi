import { NextSeo } from 'next-seo'
import React from 'react'

interface Props {}

const MorningBrewPageSeo = (props: Props) => {
  return (
    <NextSeo
      title="Powering Morning Brew's newsletter referral program with custom swag"
      description="Morning Brew is a newsletter company that sends to more than 3
      million subscribers each day. We've overhauled their
      referral program to be completely automated and backed by a
      swag program."
    />
  )
}

export default MorningBrewPageSeo
