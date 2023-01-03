import { Hero } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import { capitalize } from 'lodash-es'
import Image from 'next/image'
import pluralize from 'pluralize'
import React from 'react'
import Typewriter from 'typewriter-effect'
import underline from '../../../../public/shapes/underline1.svg'

const words = [
  'business',
  'event',
  'band',
  'fundraiser',
  'drop',
  'startup',
  'employee',
  'influencer',
]

const HomePageHero = () => {
  const [useCase, setUseCase] = React.useState<React.ReactNode>('Businesses')

  React.useEffect(() => {
    setUseCase(
      <Typewriter
        aria-hidden="true"
        options={{
          strings: words.map(word => pluralize(capitalize(word), 2)),
          autoStart: true,
          loop: true,
          delay: 100,
        }}
      />,
    )
  }, [])

  return (
    <Hero
      title={
        <>
          <span className="inline font-headingDisplay">
            Make the stitch.
            <span className="flex flex-wrap whitespace-nowrap gap-x-2 text-black">
              Merch for
              <mark className="relative sm:w-auto bg-primary px-2 lowercase rounded-md">
                {useCase}
              </mark>
              .<span className="sr-only">{words.join(` ,`)}</span>
            </span>
          </span>
        </>
      }
      subtitle={
        <>
          We design high-quality custom merchandise and merch programs. We are
          the promotional product experts.
        </>
      }
      primaryCta={{
        title: (
          <>
            <span>Get started for free</span>
            <span className="ml-2 relative transition-all w-[16px] h-[16px]">
              <span className="absolute top-[2px] left-0 ml-1/2 group-hover:left-1.5 duration-200">
                <ArrowRight strokeWidth="4" width="16px" height="16px" />
              </span>
            </span>
          </>
        ),
        buttonClassName: 'group !rounded-full sm:!text-2xl flex items-center',
        href: routes.internal.getStarted.href(),
      }}
    />
  )
}

export default HomePageHero
