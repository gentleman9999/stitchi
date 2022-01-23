import Link from 'next/link'
import React from 'react'
import { Button } from 'ui'

interface Cta {
  title: string
  href: string
}

export interface HeroProps {
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
  primaryCta?: Cta
  secondaryCta?: Cta
}

const Hero = (props: HeroProps) => {
  return (
    <div className="relative bg-paper overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            {props.title && (
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-7xl">
                {props.title}
              </h1>
            )}
            {props.subtitle && (
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {props.subtitle}
              </p>
            )}

            {(props.primaryCta || props.secondaryCta) && (
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                {props.primaryCta && (
                  <div className="rounded-md shadow">
                    <Link href={props.primaryCta.href} passHref>
                      <Button Component="a">{props.primaryCta.title}</Button>
                    </Link>
                  </div>
                )}
                {props.secondaryCta && (
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link href={props.secondaryCta.href} passHref>
                      <Button Component="a">{props.secondaryCta.title}</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Hero
