'use client'

import Section from '@components/common/Section'
import React from 'react'
import Container from '@components/ui/Container'
import { useForm } from 'react-hook-form'
import HomePageHeroListItem from './HomePageHeroListItem'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn } from '@lib/utils'
import CustomerLogoBanner from '@components/common/CustomerLogoBanner'

export enum Interest {
  Design = 'design',
  Sourcing = 'sourcing',
  Logistics = 'logistics',
  Warehousing = 'warehousing',
  Storefront = 'storefront',
  Analytics = 'analytics',
}

const buttonColors = {
  [Interest.Design]: 'red-500',
  [Interest.Sourcing]: 'orange-500',
  [Interest.Logistics]: 'pink-500',
  [Interest.Warehousing]: 'indigo-500',
  [Interest.Storefront]: 'blue-500',
  [Interest.Analytics]: 'cyan-500',
}

const getGradientColor = (interests: Interest[]) => {
  const gradientClasses = ['bg-gradient-to-br']

  if (interests.length === 0) {
    gradientClasses.push(
      `from-${buttonColors[Interest.Design]} to-${
        buttonColors[Interest.Sourcing]
      }`,
    )
  }

  if (interests.length > 0) {
    gradientClasses.push(`from-${buttonColors[interests[0]]}`)
  }

  for (let i = 1; i < interests.length - 1; i++) {
    gradientClasses.push(`via-${buttonColors[interests[i]]}`)
  }

  if (interests.length > 1) {
    gradientClasses.push(`to-${buttonColors[interests[interests.length - 1]]}`)
  }

  return gradientClasses.join(' ')
}
const schema = yup.object().shape({
  interests: yup
    .array()
    .of(yup.mixed<Interest>().oneOf(Object.values(Interest)).required())
    .required()
    .min(0),
})

export type FormInput = yup.InferType<typeof schema>

const SharedBadge = <CheckBadgeIcon className="w-8 h-8 text-white" />

const HomePageHero = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      interests: [],
    },
  })

  const { control, watch } = form

  const interests = watch('interests')
  return (
    <header className="relative z-0 min-h-[calc(100vh-var(--topbar-height))]">
      <Section gutter="lg" className="flex flex-col gap-32">
        <Container className="flex flex-col justify-center items-center gap-12">
          <div className="flex max-w-5xl">
            <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl inline font-headingDisplay">
              Shop, store, and ship the highest quality swag around the world
              {/* Precision screen printing & embroidary delivered anywhere */}
              {/* The best place to scale merch, profitably */}
            </h1>
          </div>
        </Container>

        <form className="" {...form}>
          <Container>
            <p className=" text-center text-2xl font-medium text-gray-600">
              What do you want help with?
            </p>
          </Container>

          <div
            className="w-full flex flex-nowrap overflow-x-auto no-scrollbar"
            role="group"
            aria-labelledby="legend"
          >
            <div id="legend" className="sr-only">
              Solutions
            </div>
            <ul className="m-auto flex flex-row gap-4 sm:flex-wrap justify-start sm:justify-center p-8">
              <HomePageHeroListItem
                label="Design"
                value={Interest.Design}
                name="interests"
                description="Work with our designers to create merch that speaks your brand"
                icon={SharedBadge}
                color={0}
                control={control}
              />
              <HomePageHeroListItem
                label="Sourcing"
                value={Interest.Sourcing}
                name="interests"
                description="This is some placeholder text about the feature"
                icon={SharedBadge}
                color={1}
                control={control}
              />
              <HomePageHeroListItem
                label="Logistics"
                value={Interest.Logistics}
                name="interests"
                description="This is some placeholder text about the feature"
                icon={SharedBadge}
                color={2}
                control={control}
              />
              <HomePageHeroListItem
                label="Warehousing"
                value={Interest.Warehousing}
                name="interests"
                description="This is some placeholder text about the feature"
                icon={SharedBadge}
                color={3}
                control={control}
              />
              <HomePageHeroListItem
                label="Storefront"
                value={Interest.Storefront}
                name="interests"
                description="This is some placeholder text about the feature"
                icon={SharedBadge}
                color={4}
                control={control}
              />
              <HomePageHeroListItem
                label="Analytics"
                value={Interest.Analytics}
                name="interests"
                description="This is some placeholder text about the feature"
                icon={SharedBadge}
                color={5}
                control={control}
              />
            </ul>
          </div>
          <Container>
            <div className="flex justify-center">
              <Link
                href={routes.internal.getStarted.href()}
                className={cn(
                  'rounded-lg inline-flex items-center gap-2 py-3 px-4 text-white font-medium shadow-lg transition-all hover:scale-105',
                  getGradientColor(interests),
                )}
              >
                Start creating merch{' '}
                <ArrowRight strokeWidth="2" className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </form>

        <div>
          <Container className="mb-10">
            <p className=" text-gray-600 text-2xl">
              Powering merch for the world&apos;s top brands.
            </p>
          </Container>

          <CustomerLogoBanner />
        </div>
      </Section>
    </header>
  )
}

export default HomePageHero
