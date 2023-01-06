import { Section, TwitterTweetEmbed } from '@components/common'
import { Button } from '@components/ui'
import routes from '@lib/routes'
import { generateImageSizes } from '@utils/image'
import { ArrowRight } from 'icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import referralApp from '../../../../public/industries/newsletter/referral-app.png'
import brewTweet from '../../../../public/industries/newsletter/morning-brew-referral-program-giveaway.png'

const Hero = () => {
  return (
    <Section gutter="lg">
      <div className="flex gap-8">
        <div>
          <h1 className="font-headingDisplay text-7xl font-bold max-w-2xl">
            Exponential subscriber growth like the pros 🚀
          </h1>
          <br />
          <br />
          <p className="text-xl text-gray-700 max-w-lg">
            Get thousands of word-of-mouth referrals and reduce subscriber
            acquisition cost to a fraction of what you pay today.
          </p>
          <br />
          <br />
          <br />
          <Link passHref href={routes.internal.getStarted.href()}>
            <Button
              Component="a"
              endIcon={<ArrowRight width={16} height={16} strokeWidth={3} />}
            >
              Grow your list
            </Button>
          </Link>
        </div>
        <div className="relative w-1/2">
          <div className="absolute top-0">
            <div className="rounded-2xl drop-shadow-sm overflow-hidden w-96  relative">
              <Image
                {...brewTweet}
                priority
                layout="responsive"
                objectFit="cover"
                alt="Referral program app"
                sizes={generateImageSizes([
                  { imageWidth: '50vw' },
                  { maxWidth: 'sm', imageWidth: '100vw' },
                ])}
              />
            </div>
          </div>

          <div className="absolute top-[30%] right-0">
            <div className="rounded-xl drop-shadow-xl w-52 relative">
              <Image
                {...referralApp}
                priority
                layout="responsive"
                objectFit="cover"
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
  )
}

export default Hero
