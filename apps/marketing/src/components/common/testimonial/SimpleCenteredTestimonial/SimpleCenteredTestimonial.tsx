import { ArrowRight } from 'icons'
import cx from 'classnames'
import React from 'react'
import { Spokesperson } from '..'
import LinkInline from '@components/ui/LinkInline'
import Image, { StaticImageData } from 'next/image'

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
    <div className="flex gap-12 items-center justify-center">
      <div>
        <div className="relative w-40 h-8">
          <Image
            src={company.logo.src}
            alt={`${company.name} logo`}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        <blockquote className="mt-10">
          <div className="max-w-2xl text-left text-2xl leading-9 font-medium text-gray-900">
            <p>{`"${testimonial}"`}</p>
          </div>
          <footer className="mt-8">
            <Spokesperson {...spokesperson} />
          </footer>
        </blockquote>

        {cta ? (
          <div className="flex justify-left">
            <LinkInline
              href={cta.href}
              className={cx(
                'relative inline-flex items-center justify-left mt-8 group',
                cta.className,
              )}
            >
              {cta.text}
              <span className="transition-all absolute -right-5 group-hover:translate-x-1">
                <ArrowRight strokeWidth={3} width={14} />
              </span>
            </LinkInline>
          </div>
        ) : null}
      </div>
      <div className="ring-8 ring-primary relative w-full max-w-[260px] aspect-square overflow-hidden rounded-xl hidden md:flex">
        <Image
          src={spokesperson.headshot.src}
          alt={`${spokesperson.name} headshot`}
          fill
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default SimpleCenteredTestimonial
