import Link from 'next/link'
import React from 'react'
import Section from '../Section'
import Button, { ButtonProps } from '@components/ui/ButtonV2'

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
              <h1 className="text-center font-semibold font-headingDisplay uppercase text-gray-900 text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                {props.title}
              </h1>
            )}
            {props.subtitle && (
              <p className="text-center mt-10 max-w-md font-light text-base text-gray-500 sm:text-lg lg:text-2xl md:max-w-2xl">
                {props.subtitle}
              </p>
            )}

            {(props.primaryCta || props.secondaryCta) && (
              <div className="mt-12 max-w-md sm:flex">
                {props.primaryCta && (
                  <div className="rounded-sm">
                    <Button
                      size="2xl"
                      Component={Link}
                      href={props.primaryCta.href}
                      endIcon={props.primaryCta.endIcon}
                      color="brandPrimary"
                    >
                      {props.primaryCta.title}
                    </Button>
                  </div>
                )}
                {props.secondaryCta && (
                  <Button
                    size="2xl"
                    Component={Link}
                    href={props.secondaryCta.href}
                  >
                    {props.secondaryCta.title}
                  </Button>
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
