import { Section } from '@components/common'
import { ArrowRight } from 'icons'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import React from 'react'
import { Spokesperson } from '..'

export interface SimpleCenteredTestimonialProps {
  testimonial: string | React.ReactNode
  cta?: {
    text: string
    href: string
    className?: string
  }
  company: {
    name: string
    logo: StaticImageData
  }
  spokesperson: {
    name: string
    title: string
    headshot: StaticImageData
  }
}

const SimpleCenteredTestimonial = ({
  testimonial,
  company,
  spokesperson,
  cta,
}: SimpleCenteredTestimonialProps) => {
  return (
    <Section gutter="lg">
      <div className="relative">
        <div className="relative mx-auto h-8">
          <Image
            // {...company.logo}
            src={company.logo.src}
            alt={`${company.name} logo`}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <blockquote className="mt-10">
          <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
            <p>{`"${testimonial}"`}</p>
          </div>
          <footer className="mt-8">
            <Spokesperson {...spokesperson} />
          </footer>
        </blockquote>

        {cta ? (
          <div className="flex justify-center">
            <Link href={cta.href}>
              <a
                className={cx(
                  'relative inline-flex items-center justify-center mt-8 group',
                  cta.className,
                )}
              >
                {cta.text}
                <span className="transition-all absolute -right-5 group-hover:translate-x-1">
                  <ArrowRight strokeWidth={3} width={14} />
                </span>
              </a>
            </Link>
          </div>
        ) : null}
      </div>
    </Section>
  )
}

export default SimpleCenteredTestimonial
