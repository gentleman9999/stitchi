import Link from 'next/link'
import React from 'react'
import { Button, ButtonProps } from '@components/ui'
import { Section } from '../../../common'

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
    <header>
      <Section
        gutter="lg"
        className="min-h-[98vh] flex flex-col justify-center items-center"
      >
        <div className="flex gap-8 max-w-4xl">
          <div className="flex-auto flex flex-col items-center">
            {props.title && (
              <h1 className="text-center font-semibold font-headingDisplay text-gray-900 text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {props.title}
              </h1>
            )}
            {props.subtitle && (
              <p className="text-center mt-10 max-w-md font-light text-base text-gray-700 sm:text-lg lg:text-2xl md:max-w-2xl">
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
                    <Button
                      shadow
                      Component="a"
                      className="mt-3 sm:mt-0 sm:ml-3"
                    >
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
    </header>
  )
}

export default Hero
