import { Section } from '@components/common'
import Button from '@components/ui/ButtonV2/Button'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import styles from './HomePageHero.module.css'
import Container from '@components/ui/Container'

const HomePageHero = () => {
  return (
    <header className="relative z-0 ">
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
          className="min-h-[100vh] flex flex-col justify-center items-center"
        >
          <div className="flex max-w-5xl">
            <div className="flex-auto flex flex-col items-center gap-16">
              <h1 className="text-center font-semibold font-headingDisplay text-6xl sm:text-7xl md:text-8xl xl:text-9xl">
                <div className="inline font-headingDisplay uppercase">
                  Merch simplified
                  <span className="text-primary">.</span>
                </div>
              </h1>
              <ul className="flex-col gap-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <ListItem label="End-to-end platform" />
                <ListItem label="Premium products" />
                <ListItem label="Integrations" />
                <ListItem label="Dedicated support" />
                <ListItem label="Global fulfillment" />
                <ListItem label="Warehousing" />
              </ul>

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

const ListItem = ({ label }: { label: string }) => {
  return (
    <li className="flex items-center gap-2 font-medium text-lg leading-tight">
      <div className="flex items-center justify-center bg-primary w-5 h-5 rounded-sm text-sm text-gray-950">
        ✓
      </div>

      {label}
    </li>
  )
}

export default HomePageHero
