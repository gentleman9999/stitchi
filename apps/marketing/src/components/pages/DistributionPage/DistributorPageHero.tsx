import { Section } from '@components/common'
import {
  Button,
  Container,
  RangeSlider as BaseRangeSlider,
  RangeSliderProps,
} from '@components/ui'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import currency from 'currency.js'
import { calculate } from './helpers'

const RangeSlider = (props: RangeSliderProps) => (
  <BaseRangeSlider
    inputClassName="bg-transparent border-4 !text-2xl font-medium"
    className="mt-8"
    {...props}
  />
)

const DistributorPageHero = () => {
  const form = useForm({
    defaultValues: {
      count: 1000,
      duration: 30,
    },
  })

  const { control, watch } = form
  const [count, duration] = watch(['count', 'duration'])

  const { totalCostInCents } = calculate({
    itemCount: count,
    storageDuration: duration,
  })

  return (
    <div className="min-h-screen flex items-center bg-secondary">
      <Container>
        <Section gutter="xl">
          <div className="mt-10 flex flex-col sm:flex-row gap-8 md:gap-10 lg:gap-12">
            <div className="flex-auto max-w-[66%]">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-extrabold tracking-tight leading-tight">
                Automate merch fulfillment without hiring
              </h1>
              <p className="text md:text-xl text-secondaryAlt-400 mt-4 font-medium">
                Stitchi handles storing, packing, and shipping your inventory.
                We build and integrate with all e-commerce apps including
                Shopify, Instagram, and BigCommerce.
              </p>
              <div className="mt-8">
                <Link href={routes.internal.getStarted.href()} passHref>
                  <Button
                    bold
                    color="brandPrimary"
                    className="!text-primary"
                    variant="ghost"
                    Component="a"
                  >
                    Start now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 min-w-[300px]">
              <div className="ring-2 rounded-lg bg-white p-4 text-secondaryAlt-800 shadow-secondaryAlt-700 shadow-lg">
                <h2 className="text-lg font-medium">
                  Estimate your <span className="font-bold">savings</span> with
                  Stitchi fulfillment.
                </h2>
                <form>
                  <Controller
                    name="count"
                    control={control}
                    render={({ field }) => {
                      return (
                        <RangeSlider
                          {...field}
                          label="Number of items sold"
                          max={20000}
                          step={getRangeStep(field.value)}
                        />
                      )
                    }}
                  />

                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <RangeSlider
                        {...field}
                        label="Campaign days (storage duration)"
                      />
                    )}
                  />
                </form>
                <div className="block mt-8 font-bold whitespace-normal">
                  <Number costInCents={totalCostInCents} /> /campaign
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}

const Number = ({ costInCents }: { costInCents: number }) => {
  return (
    <span className="text-4xl">
      {currency(costInCents * 1.815, { fromCents: true, symbol: '$' }).format()}
    </span>
  )
}

const getRangeStep = (value: number) => {
  if (value < 10) {
    return 1
  } else if (value < 25) {
    return 2
  } else if (value < 50) {
    return 5
  } else if (value < 100) {
    return 10
  } else if (value < 200) {
    return 20
  } else if (value < 500) {
    return 50
  } else if (value < 1000) {
    return 100
  } else if (value < 2000) {
    return 200
  } else if (value < 10000) {
    return 500
  }

  return 1000
}

export default DistributorPageHero