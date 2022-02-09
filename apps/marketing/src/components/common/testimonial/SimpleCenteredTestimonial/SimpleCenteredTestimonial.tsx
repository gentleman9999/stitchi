import { Section } from '@components/common'
import Image from 'next/image'
import React from 'react'
import { Spokesperson } from '..'

export interface SimpleCenteredTestimonialProps {
  testimonial: string | React.ReactNode
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
}: SimpleCenteredTestimonialProps) => {
  return (
    <Section gutter="lg">
      <div className="relative">
        <div className="relative mx-auto h-8">
          <Image
            {...company.logo}
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
      </div>
    </Section>
  )
}

export default SimpleCenteredTestimonial
