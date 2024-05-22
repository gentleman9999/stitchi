import Section from '@components/common/Section'
import Button from '@components/ui/ButtonV2'
import { generateImageSizes } from '@lib/utils/image'
import { ArrowRight } from 'icons'
import Image from 'next/image'
import React from 'react'
import referralApp from '../../../../public/industries/newsletter/referral-app.png'
import brewTweet from '../../../../public/industries/newsletter/morning-brew-referral-program-giveaway.png'
import IntercomButton from '@components/common/IntercomButton'

const Hero = () => {
  return (
    <header>
      <Section gutter="lg">
        <div className="flex gap-8">
          <div>
            <h1 className="font-headingDisplay text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              Exponential customer growth like the pros 🚀
            </h1>
            <br className="hidden md:block" />
            <br />
            <p className="text sm:text-lg lg:text-xl text-gray-700 lg:max-w-md xl:max-w-lg">
              Get thousands of word-of-mouth referrals and reduce customer
              acquisition cost to a fraction of what you pay today.
            </p>
            <br className="hidden md:block" />
            <br />
            <br />
            <IntercomButton
              message="I'm interested in creating a swag box."
              as={
                <Button
                  endIcon={
                    <ArrowRight width={16} height={16} strokeWidth={3} />
                  }
                >
                  Grow your list
                </Button>
              }
            />
          </div>
          <div className="relative w-1/2 hidden lg:block">
            <div className="absolute top-0 right-0">
              <div className="rounded-2xl drop-shadow-sm overflow-hidden w-64 md:w-80 lg:w-96 relative">
                <Image
                  {...brewTweet}
                  priority
                  style={{ objectFit: 'cover' }}
                  alt="Referral program app"
                  sizes={generateImageSizes([
                    { imageWidth: '50vw' },
                    { maxWidth: 'sm', imageWidth: '100vw' },
                  ])}
                />
              </div>
            </div>

            <div className="absolute top-[30%] -right-10">
              <div className="rounded-xl drop-shadow-xl md:w-40 lg:w-52 relative">
                <Image
                  {...referralApp}
                  priority
                  style={{ objectFit: 'cover' }}
                  alt="Referral program app"
                  sizes={generateImageSizes([
                    { imageWidth: '50vw' },
                    { maxWidth: 'sm', imageWidth: '100vw' },
                  ])}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </header>
  )
}

export default Hero
