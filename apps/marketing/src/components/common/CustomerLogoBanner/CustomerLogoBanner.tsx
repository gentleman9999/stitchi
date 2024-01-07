import React from 'react'
import Image, { StaticImageData } from 'next/legacy/image'
import weworkLogo from '../../../../public/customers/wework/wework_logo.png'
import greekDressingLogo from '../../../../public/customers/greek_dressing/greek_dressing_logo.svg'
import morningBrewLogo from '../../../../public/customers/morning_brew/morning_brew_logo_black.png'
import greekLicensingLogo from '../../../../public/customers/greek_licensing/greek_licensing_logo.png'
import lineleapLogo from '../../../../public/customers/lineleap/lineleap_logo.png'
import Container from '@components/ui/Container'
import { InfiniteLooper } from '@components/common'

const BrandLogo = (props: { image: StaticImageData; alt: string }) => {
  return (
    <div className="relative w-full h-[120px] min-w-[120px] mx-4 sm:mx-6">
      <Image
        src={props.image.src}
        alt={props.alt}
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
}

const CustomerLogoBanner = () => {
  return (
    <div className="bg-primary py-5 relative flex flex-col sm:flex-row items-center border-y border-gray-950 overflow-x-hidden">
      <span className="hidden sm:flex justify-center absolute left-0 right-0">
        <InfiniteLooper speed={20}>
          <BrandLogo image={weworkLogo} alt="WeWork logo" />
          <BrandLogo image={morningBrewLogo} alt="Morning Brew logo" />
          <BrandLogo image={greekDressingLogo} alt="Greek Dressing logo" />
          <BrandLogo image={lineleapLogo} alt="Lineleep logo" />
          <BrandLogo image={greekLicensingLogo} alt="Greek Licensing logo" />
        </InfiniteLooper>
      </span>
      <span className="bg-primary w-full sm:w-[350px] absolute left-0 top-0 bottom-0 hidden sm:block" />

      <Container>
        <div className="flex flex-col sm:flex-row gap-10 items-center relative ">
          <h2 className="text-center sm:text-left text-3xl font-semibold sm:w-[350px] shrink-0 bg-primary leading-1">
            Powering merch for <br /> the world&apos;s top brands.
          </h2>
        </div>
      </Container>

      <span className="flex justify-center sm:hidden">
        <InfiniteLooper speed={20}>
          <BrandLogo image={weworkLogo} alt="WeWork logo" />
          <BrandLogo image={morningBrewLogo} alt="Morning Brew logo" />
          <BrandLogo image={greekDressingLogo} alt="Greek Dressing logo" />
          <BrandLogo image={lineleapLogo} alt="Lineleep logo" />
          <BrandLogo image={greekLicensingLogo} alt="Greek Licensing logo" />
        </InfiniteLooper>
      </span>
    </div>
  )
}

export default CustomerLogoBanner
