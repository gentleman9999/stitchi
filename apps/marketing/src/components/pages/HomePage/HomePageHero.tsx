import { Hero } from '@components/common'
import routes from '@lib/routes'
import React, { useRef } from 'react'

const SPEED = 50

const USE_CASES = ['startups', 'events', 'bands', 'fundraisers', 'drops']

const UseCase = ({ useCase }: { useCase: string }) => {
  // const ref = useRef<HTMLSpanElement>()

  // React.useEffect(() => {
  //   let i = 0

  //   const typeWriter = () => {
  //     if (i < useCase.length) {
  //       ref.current.innerHTML += useCase.charAt(i)
  //       i++
  //       setTimeout(typeWriter, SPEED)
  //     }
  //   }

  //   typeWriter()

  //   return () => {
  //     clearTimeout()
  //   }
  // }, [useCase])

  return (
    <span className="inline-block text-brand-primary xl:inline underline">
      {useCase}
    </span>
  )
}

const HomePageHero = () => {
  const [useCase, setUseCase] = React.useState('startups')

  // React.useEffect(() => {
  //   const rotateUseCase = () => {
  //     setUseCase(USE_CASES[Math.floor(Math.random() * USE_CASES.length)])
  //     setTimeout(rotateUseCase, 5000)
  //   }

  //   rotateUseCase()

  //   return () => {
  //     clearTimeout()
  //   }
  // }, [])

  return (
    <Hero
      title={
        <>
          <span className="block xl:inline">
            Make the stitch.{' '}
            <span className="block whitespace-nowrap">
              Merch for <UseCase useCase={useCase} />.
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
