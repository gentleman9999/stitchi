import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import cx from 'classnames'
import { Section } from '@components/common'

interface Props {}

const DesignPageHero = ({}: Props) => {
  return (
    <Section gutter="lg">
      <Link href={routes.internal.getStarted.href()}>
        <a className="inline-flex py-1 items-center font-bold text-black flex-wrap font-heading">
          <span className="bg-primary px-2 py-1 rounded-md text-sm md:text-md mr-2 mt-2">
            Free, unlimited revisions
          </span>{' '}
          <h1 className="text-sm md:text-md tracking-wide text-grey-900 mt-2">
            Professional promotional product design
          </h1>
        </a>
      </Link>

      <div className="mt-6 py-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium w-[70%] font-headingDisplay leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
          A <Highlighted className="text-primary">unicorn</Highlighted> with{' '}
          <Highlighted className="text-primary">
            a basketball jersey
          </Highlighted>{' '}
          on a <Highlighted className="text-primary">mountain</Highlighted>
        </h2>
      </div>
    </Section>
  )
}

const Highlighted = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={cx(
        'ring-1 px-3 rounded-xl whitespace-nowrap ring-gray-300',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default DesignPageHero
