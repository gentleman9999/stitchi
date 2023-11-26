import { Section } from '@components/common'
import Button from '@components/ui/ButtonV2/Button'
import Checkbox from '@components/ui/inputs/Checkbox'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import styles from './HomePageHero.module.css'
import Container from '@components/ui/Container'

const HomePageHero = () => {
  return (
    <header className="relative z-0">
      <div className={styles.bg}>
        <div>
          <img src="/shapes/home-elipses-lg.svg" />
        </div>
        <div>
          <img src="/shapes/home-elipses-lg.svg" />
        </div>
        <div>
          <img src="/shapes/home-elipses-lg.svg" />
        </div>
      </div>
      <Container>
        <Section
          gutter="lg"
          className="min-h-[98vh] flex flex-col justify-center items-center"
        >
          <div className="flex max-w-5xl">
            <div className="flex-auto flex flex-col items-center gap-16">
              <h1 className="text-center font-semibold font-headingDisplay text-gray-900 text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <div className="inline font-headingDisplay">
                  Revolutionize your branded merchandise experience
                  <span className="text-primary">.</span>
                </div>
              </h1>
              <ul className="flex flex-col gap-2">
                <ListItem label="Premium products" />
                <ListItem label="Personal support" />
                <ListItem label="Global fulfillment" />
                <ListItem label="Warehousing" />
                <ListItem label="End-to-end platform" />
              </ul>

              <div className="max-w-md sm:flex">
                <div className="rounded-md">
                  <Button
                    size="xl"
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

const ListItem = ({ label }: { label: string }) => {
  return (
    <li className="flex items-center gap-2 font-medium text-lg leading-tight">
      <Checkbox checked name="checkbox" value={''} onChange={() => {}} />
      {label}
    </li>
  )
}

export default HomePageHero
