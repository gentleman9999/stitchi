import { Section } from '@components/common'
import Button from '@components/ui/ButtonV2/Button'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <header>
      <Section gutter="md">
        <div className="flex gap-8">
          <div>
            <h1 className="font-headingDisplay text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              Create Unforgettable Brand Experiences with Custom Swag Boxes
            </h1>
            <br className="hidden md:block" />
            <br />
            <p className="text sm:text-lg lg:text-xl text-gray-700 lg:max-w-md xl:max-w-lg">
              Embrace the power of custom swag in-a-box to deliver a unique
              experience and reinforce your brand.
            </p>
            <br className="hidden md:block" />
            <br />
            <br />
            <Button
              href={routes.internal.getStarted.href()}
              Component={Link}
              endIcon={<ArrowRight width={16} height={16} strokeWidth={3} />}
            >
              Build a box
            </Button>
          </div>
        </div>
      </Section>
    </header>
  )
}

export default Hero
