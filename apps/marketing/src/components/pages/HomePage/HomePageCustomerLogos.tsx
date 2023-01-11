import React from 'react'
import Image, { StaticImageData } from "next/legacy/image";
import weworkLogo from '../../../../public/customers/wework/wework_logo.png'
import greekDressingLogo from '../../../../public/customers/greek_dressing/greek_dressing_logo.svg'
import morningBrewLogo from '../../../../public/customers/morning_brew/morning_brew_logo_black.png'
import greekLicensingLogo from '../../../../public/customers/greek_licensing/greek_licensing_logo.png'
import lineleapLogo from '../../../../public/customers/lineleap/lineleap_logo.png'
import { Container } from '@components/ui'
import { InfiniteLooper, Section } from '@components/common'

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

const HomePageCustomerLogos = () => {
  return (
    <Section>
      <div className="bg-primary py-5">
        <Container>
          <div className="flex flex-col sm:flex-row gap-10 items-center">
            <h2 className="text-center sm:text-left text-4xl font-medium sm:w-[40%] shrink-0 font-heading">
              We power merch for your favorite brands.
            </h2>
            <InfiniteLooper speed={20}>
              <span className="flex justify-items-center">
                <BrandLogo image={weworkLogo} alt="WeWork logo" />
                <BrandLogo image={morningBrewLogo} alt="Morning Brew logo" />
                <BrandLogo
                  image={greekDressingLogo}
                  alt="Greek Dressing logo"
                />
                <BrandLogo image={lineleapLogo} alt="Lineleep logo" />
                <BrandLogo
                  image={greekLicensingLogo}
                  alt="Greek Licensing logo"
                />
              </span>
            </InfiniteLooper>
          </div>
        </Container>
      </div>
    </Section>
  )
}

export default HomePageCustomerLogos
