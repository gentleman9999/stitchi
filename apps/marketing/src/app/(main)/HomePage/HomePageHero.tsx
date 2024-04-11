import Section from '@components/common/Section'
import Button from '@components/ui/ButtonV2/Button'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import Container from '@components/ui/Container'
import HomePageHeroListItem from './HomePageHeroListItem'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

const SharedBadge = <CheckBadgeIcon className="w-8 h-8 text-white" />

const HomePageHero = () => {
  return (
    <header className="relative z-0 ">
      <Container>
        <Section
          gutter="lg"
          className="min-h-[100vh] flex flex-col justify-center items-center"
        >
          <div className="flex max-w-5xl">
            <div className="flex-auto flex flex-col items-center gap-16">
              <h1 className="text-center font-bold font-headingDisplay text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
                <div className="inline font-headingDisplay ">
                  The best place to scale merch, profitably
                </div>
              </h1>
              <fieldset className="w-full">
                <legend className="text-center text-xl font-semibold text-gray-800">
                  What do you want help with?
                </legend>
                <ul className="flex flex-row gap-4 mt-8 flex-wrap">
                  <HomePageHeroListItem
                    label="Design"
                    description="This is some placeholder text about the feature"
                    icon={SharedBadge}
                    color={0}
                  />
                  <HomePageHeroListItem
                    label="Sourcing"
                    description="This is some placeholder text about the feature"
                    icon={SharedBadge}
                    color={1}
                  />
                  <HomePageHeroListItem
                    label="Logistics"
                    description="This is some placeholder text about the feature"
                    icon={SharedBadge}
                    color={2}
                  />
                  <HomePageHeroListItem
                    label="Warehousing"
                    description="This is some placeholder text about the feature"
                    icon={SharedBadge}
                    color={3}
                  />
                  <HomePageHeroListItem
                    label="Storefront"
                    description="This is some placeholder text about the feature"
                    icon={SharedBadge}
                    color={4}
                  />
                  <HomePageHeroListItem
                    label="Analytics"
                    description="This is some placeholder text about the feature"
                    icon={SharedBadge}
                    color={5}
                  />
                </ul>
              </fieldset>

              <div className="max-w-md sm:flex">
                <div className="rounded-sm">
                  <Button
                    size="2xl"
                    Component={Link}
                    href={routes.internal.getStarted.href()}
                    endIcon={<ArrowRight strokeWidth="2" className="w-4 h-4" />}
                    color="brandPrimary"
                  >
                    Start creating merch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </header>
  )
}

export default HomePageHero
