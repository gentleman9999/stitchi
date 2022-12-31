import { Hero } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import { capitalize } from 'lodash-es'
import pluralize from 'pluralize'
import React from 'react'
import Typewriter from 'typewriter-effect'

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
          // wrapperClassName: 'Typewriter__wrapper inline',
          // cursorClassName: 'Typewriter__cursor ',
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
              <mark className="sm:w-auto bg-primary px-2 lowercase rounded-md">
                {useCase}
              </mark>
              .<span className="sr-only">{words.join(` ,`)}</span>
            </span>
          </span>
        </>
      }
      subtitle={
        <>
          We design high-quality custom merch and merch programs. We are the
          promotional product experts.
        </>
      }
      primaryCta={{
        title: (
          <div className="flex">
            Get started for free
            <span className="ml-1 relative transition-all w-[15px]">
              <span className="absolute top-0 left-0 ml-1/2 group-hover:left-1.5 duration-200">
                <ArrowRight strokeWidth="4" width="15px" />
              </span>
            </span>
          </div>
        ),
        buttonClassName: 'group',
        href: routes.internal.getStarted.href(),
      }}
    />
  )
}

export default HomePageHero
