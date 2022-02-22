import { Hero } from '@components/common'
import routes from '@lib/routes'
import { capitalize } from 'lodash-es'
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
]

const HomePageHero = () => {
  const [useCase, setUseCase] = React.useState<React.ReactNode>('Businesses')

  React.useEffect(() => {
    setUseCase(
      <Typewriter
        aria-hidden="true"
        options={{
          strings: words.map(word => capitalize(word)),
          autoStart: true,
          loop: true,
          delay: 100,
          wrapperClassName:
            'Typewriter__wrapper underline text-brand-primary inline',
          cursorClassName:
            'Typewriter__cursor text-brand-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
        }}
      />,
    )
  }, [])

  return (
    <Hero
      title={
        <>
          <span className="inline">
            Make the stitch.
            <span className="flex flex-wrap whitespace-nowrap justify-center gap-x-2">
              <span className="w-full sm:w-auto">{useCase}</span> merch.
              <span className="sr-only">{words.join(` ,`)}</span>
            </span>
          </span>
        </>
      }
      subtitle={
        <>
          Get paired with a <span className="underline">Stitchi Tailor</span>{' '}
          (an actual human) and start making professional, high-quality custom
          merch from start to finish.
        </>
      }
      primaryCta={{
        title: 'Get started for free',
        href: routes.internal.getStarted.href(),
      }}
    />
  )
}

export default HomePageHero
