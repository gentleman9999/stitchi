import { Section } from '@components/common'
import Image from 'next/image'
import React from 'react'
import { Container } from 'ui'

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

        {/* <img
            className="mx-auto h-8"
            src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg"
            alt="Workcation"
          /> */}
        <blockquote className="mt-10">
          <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
            <p>{`"${testimonial}"`}</p>
          </div>
          <footer className="mt-8">
            <div className="md:flex md:items-center md:justify-center">
              <div className="md:flex-shrink-0">
                <Image
                  {...spokesperson.headshot}
                  alt={`${spokesperson.name} headshot`}
                  width={50}
                  height={50}
                  className="mx-auto h-10 w-10 rounded-full"
                />
              </div>
              <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                <div className="text-base font-medium text-gray-900">
                  {spokesperson.name}
                </div>

                <svg
                  className="hidden md:block mx-1 h-5 w-5 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 0h3L9 20H6l5-20z" />
                </svg>

                <div className="text-base font-medium text-gray-500">
                  {spokesperson.title}
                </div>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </Section>
  )
}

export default SimpleCenteredTestimonial
