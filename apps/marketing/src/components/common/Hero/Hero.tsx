import Link from 'next/link'
import React from 'react'
import { Button } from 'ui'
import { Section } from '..'

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
    <Section gutter="lg" className="min-h-[60vh] flex flex-col justify-center">
      <div className="text-center">
        {props.title && (
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
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
              <Link href={props.secondaryCta.href} passHref>
                <Button shadow Component="a" className="mt-3 sm:mt-0 sm:ml-3">
                  {props.secondaryCta.title}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}

export default Hero
