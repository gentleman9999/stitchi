import { Hero } from '@components/common'
import React from 'react'

const HomePageHero = () => {
  return (
    <Hero
      title={
        <>
          <span className="block xl:inline">Make the stitch. Merch for</span>{' '}
          <span className="inline-block text-tertiary xl:inline underline">
            startups
          </span>
          <span className="inline-block xl:inline">.</span>
        </>
      }
      subtitle={
        <>
          Get paired with a <span className="underline">Stitchi Executive</span>
           (a real human) and start making professional, high-quality custom
          merch from start to finish.
        </>
      }
      primaryCta={{
        title: 'Get started for free',
        href: '/',
      }}
    />
  )
}

export default HomePageHero
