import { Section } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import { Button } from 'ui'

const HomePageClosingSection = () => {
  return (
    <Section gutter="md">
      <div className="relative rounded-2xl px-6 py-10 bg-primary overflow-hidden shadow-xl sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1463 360"
          >
            <path
              className="text-[#C1E800] text-opacity-40"
              fill="currentColor"
              d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
            />
            <path
              className="text-[#B0D400] text-opacity-40"
              fill="currentColor"
              d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
            />
          </svg>
        </div>
        <div className="relative">
          <div className="sm:text-center">
            <h2 className="text-2xl font-extrabold text-paper sm:text-4xl">
              <span className="block">
                Unlock the power of promotional products.
              </span>
              <span className="block">
                {/* Take the hassle out of promotional products. */}
              </span>
            </h2>
            {/* <p className="mt-4 text-lg leading-6 text-white"></p> */}
            <div className="shadow mt-8 inline-block">
              <Link href={routes.internal.getStarted.href()} passHref>
                <Button Component="a" color="primary">
                  <span className="flex">
                    Talk to an expert
                    <ArrowRight className="ml-2" strokeWidth="2" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default HomePageClosingSection
