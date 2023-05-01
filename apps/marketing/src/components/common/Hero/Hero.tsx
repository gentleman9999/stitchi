import Link from 'next/link'
import React from 'react'
import { Button, ButtonProps } from '@components/ui'
import { Section } from '..'

interface Cta {
  title: React.ReactNode
  href: string
  endIcon?: ButtonProps['endIcon']
}

export interface HeroProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  primaryCta?: Cta
  secondaryCta?: Cta
  graphic?: React.ReactNode
}

const Hero = (props: HeroProps) => {
  return (
    <Section gutter="lg" className="min-h-[60vh] flex flex-col justify-center">
      <div className="flex gap-8">
        <div className="flex-auto">
          {props.title && (
            <h1 className="font-bold text-gray-900 text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              {props.title}
            </h1>
          )}
          {props.subtitle && (
            <p className="mt-10 max-w-md text-base text-gray-700 sm:text-lg lg:text-xl md:max-w-2xl">
              {props.subtitle}
            </p>
          )}

          {(props.primaryCta || props.secondaryCta) && (
            <div className="mt-12 max-w-md sm:flex">
              {props.primaryCta && (
                <div className="rounded-md">
                  <Link href={props.primaryCta.href} passHref legacyBehavior>
                    <Button
                      Component="a"
                      shadow
                      endIcon={props.primaryCta.endIcon}
                    >
                      {props.primaryCta.title}
                    </Button>
                  </Link>
                </div>
              )}
              {props.secondaryCta && (
                <Link href={props.secondaryCta.href} passHref legacyBehavior>
                  <Button shadow Component="a" className="mt-3 sm:mt-0 sm:ml-3">
                    {props.secondaryCta.title}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
        {props.graphic}
      </div>
    </Section>
  )
}

export default Hero
