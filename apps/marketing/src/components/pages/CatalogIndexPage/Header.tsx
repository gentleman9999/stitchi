import React from 'react'
import { NeedleThread } from 'icons'
import Link from 'next/link'
import routes from '@lib/routes'
import { Section } from '@components/common'
import { Button } from '@components/ui'

const Header = ({
  TitleTag = 'h1',
}: {
  TitleTag?: keyof JSX.IntrinsicElements
}) => {
  return (
    <Section>
      <div className="p-8 md:p-14 md:pr-0 text-center sm:text-left bg-primary rounded-xl flex items-center">
        <div className="md:w-[70%]">
          <TitleTag className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading">
            Browse through our curated selection of products
          </TitleTag>
          <p className="mt-6 text-lg text-gray-700">
            We work with brands that you wont find anywhere else. Our team of
            experts is continually procuring the highest-quality, ethical, and
            unique products so that you can deliver experiences people love.
          </p>
          <Link href={routes.internal.getStarted.href()} passHref legacyBehavior>
            <Button className="mt-6">Talk to a designer</Button>
          </Link>
        </div>
        <div className="w-[30%] hidden md:flex items-center justify-center">
          <NeedleThread />
        </div>
      </div>
    </Section>
  );
}

export default Header
