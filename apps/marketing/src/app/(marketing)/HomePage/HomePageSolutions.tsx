import Button from '@components/ui/ButtonV2/Button'
import routes from '@lib/routes'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

import designImage from '../../../../public/home_design_illustration.png'
import productionImage from '../../../../public/home_production_illustration.png'
import fulfillmentImage from '../../../../public/home_fulfillment_illustration.png'
import Container from '@components/ui/Container'

const HomePageSolutions = () => {
  return (
    <div className="flex flex-col divide-y divide-gray-900">
      <Container>
        <Solution
          lable="Design"
          title="Iconic merchandise that leaves an impression"
          description="Your brand deserves more than a logo pasted on a t-shirt."
          cta={{
            label: 'Start designing',
            href: routes.internal.getStarted.href(),
          }}
          image={designImage}
          imageAlt="Illustration of merch design process aided by software."
        />
      </Container>

      <Container>
        <Solution
          lable="Production"
          title="Masterful quality, sustainable methods, fair pricing"
          description="The perfect blend of excellence, eco-consciousness, and affordability, bringing your brand's vision to life with integrity."
          cta={{
            label: 'Make merch',
            href: routes.internal.getStarted.href(),
          }}
          image={productionImage}
          imageAlt="Illustration of high quality merch production accompnied by print shop images."
        />
      </Container>

      <Container>
        <Solution
          lable="Fulfillment"
          title="Unmatched reach, effortless delivery"
          description="Our global fulfillment solutions ensure your brand's presence anywhere, delivering excellence and satisfaction to every corner of the world."
          cta={{
            label: 'Hands-free fulfillment',
            href: routes.internal.getStarted.href(),
          }}
          image={fulfillmentImage}
          imageAlt="Illustration of merch fulfillment process, showcasing shipping, warehousing, and in-app analytics."
        />
      </Container>
    </div>
  )
}

const Solution = ({
  image,
  imageAlt,
  description,
  lable,
  title,
  cta,
}: {
  image: StaticImageData
  imageAlt: string
  lable: string
  title: string
  description: string
  cta: {
    label: string
    href: string
  }
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-28 my-16">
      <div className="hidden md:flex relative flex-1 items-center justify-end">
        <Image
          src={image}
          sizes={`100vw`}
          className="drop-shadow-lg w-full max-w-sm h-auto md:max-w-none md:w-auto md:h-full md:max-h-[360px]"
          alt={imageAlt}
        />
      </div>
      <div className="md:flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
        <h2 className="text-3xl mb-4 font-headingDisplay uppercase">{lable}</h2>
        <div className="flex md:hidden relative items-center justify-center mb-8">
          <Image
            src={image}
            sizes={`100vw`}
            className="drop-shadow-lg w-full max-w-sm h-auto md:max-w-none md:w-auto md:h-full md:max-h-[360px]"
            alt={imageAlt}
          />
        </div>
        <p className="text-xl">{title}</p>
        <p className="text-base text-gray-500 mb-6">{description}</p>
        <Button Component={Link} href={cta.href} variant="ghost" size="xl">
          {cta.label}
        </Button>
      </div>
    </div>
  )
}

export default HomePageSolutions
