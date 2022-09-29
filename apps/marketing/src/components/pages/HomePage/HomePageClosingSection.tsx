import { Section } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import { Button } from '@components/ui'
import Image, { StaticImageData } from 'next/image'
import weworkLogo from '../../../../public/customers/wework/wework_logo.png'
import greekDressingLogo from '../../../../public/customers/greek_dressing/greek_dressing_logo.svg'
import morningBrewLogo from '../../../../public/customers/morning_brew/morning_brew_logo.png'
import greekLicensingLogo from '../../../../public/customers/greek_licensing/greek_licensing_logo.png'
import lineleapLogo from '../../../../public/customers/lineleap/lineleap_logo.png'

const BrandLogo = (props: { image: StaticImageData; alt: string }) => {
  return (
    <div className="relative w-full h-[100px] max-w-[180px]">
      <Image
        src={props.image.src}
        alt={props.alt}
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
}

const HomePageClosingSection = () => {
  return (
    <Section gutter="xl">
      <div className="relative">
        {/* <div
          aria-hidden="true"
          className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1463 360"
          >
            <path
              className="text-[#C1E800] text-opacity-40"
              fill="currentColor"
              d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
            />
            <path
              className="text-[#B0D400] text-opacity-40"
              fill="currentColor"
              d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
            />
          </svg>
        </div> */}
        <div className="relative">
          <div className="sm:text-center">
            <h2 className="text-5xl font-extrabold sm:text-7xl lg:text-8xl font-headingDisplay">
              <span className="block">Swag like...</span>
            </h2>
            <span className="mt-14 lg:mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-10 lg:gap-16 justify-items-center">
              <BrandLogo image={weworkLogo} alt="WeWork logo" />
              <BrandLogo image={morningBrewLogo} alt="Morning Brew logo" />
              <BrandLogo image={greekDressingLogo} alt="Greek Dressing logo" />
              <BrandLogo image={lineleapLogo} alt="Lineleep logo" />
              <BrandLogo
                image={greekLicensingLogo}
                alt="Greek Licensing logo"
              />
              {/* Take the hassle out of promotional products. */}
            </span>
            <p className="mt-14 lg:mt-20 text-2xl font-medium leading-tight tracking-tight max-w-[650px] md:text-center m-auto">
              Make the stitch and join hundreds of businesses, brands, and
              creators building brand engagement, loyalty, and revenue with
              Stitchi.
            </p>
            <div className="mt-16 inline-block">
              <Link href={routes.internal.getStarted.href()} passHref>
                <Button
                  Component="a"
                  color="primary"
                  bold
                  shadow
                  endIcon={<ArrowRight strokeWidth="2" />}
                >
                  Talk to us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default HomePageClosingSection
