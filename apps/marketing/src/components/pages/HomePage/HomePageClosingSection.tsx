import { Section } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import { Button } from 'ui'

const HomePageClosingSection = () => {
  return (
    <Section gutter="md">
      <div className="flex flex-col items-center text-center bg-secondary rounded-xl shadow-xl py-14 px-4">
        <h2 className="text-2xl font-extrabold text-paper sm:text-4xl">
          <span className="block">Boost your productivity.</span>
          <span className="block">Start using Workflow today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-white">
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
          Malesuada adipiscing sagittis vel nulla nec.
        </p>
        <div className="shadow mt-8">
          <Link href={routes.internal.getStarted.href()} passHref>
            <Button Component="a" color="brandPrimary">
              <span className="flex">
                Talk to an expert
                <ArrowRight className="ml-2" strokeWidth="2" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}

export default HomePageClosingSection
