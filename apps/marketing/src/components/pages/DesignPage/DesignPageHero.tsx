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
        <a className="inline-flex py-1 items-center font-bold text-purple-500">
          <span className="bg-purple-100 px-2 py-1 rounded-md text-sm mr-2">
            Free, unlimited revisions
          </span>{' '}
          <h1 className="text-sm tracking-wide text-grey-900 ">
            Professional promotional product design
          </h1>
        </a>
      </Link>

      <div className="mt-6 py-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium w-[70%] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed">
          A <Highlighted className="text-red-500">unicorn</Highlighted> with{' '}
          <Highlighted className="text-orange-500">
            a basketball jersey
          </Highlighted>{' '}
          on a <Highlighted className="text-purple-500">mountain</Highlighted>
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
