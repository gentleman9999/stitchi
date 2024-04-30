import React from 'react'
import Image, { StaticImageData } from 'next/legacy/image'
import weworkLogo from '../../../../public/customers/wework/wework_logo.png'
import greekDressingLogo from '../../../../public/customers/greek_dressing/greek_dressing_logo.svg'
import morningBrewLogo from '../../../../public/customers/morning_brew/morning_brew_logo_black.png'
import lineleapLogo from '../../../../public/customers/lineleap/lineleap_logo.png'
import johnnyHamcheckLogo from '../../../../public/customers/johnny_hamcheck_logo.png'
import iscgLogo from '../../../../public/customers/iscg_logo.png'
import haworthLogoBlack from '../../../../public/customers/haworth_logo_black.png'
import claudyLogoBlack from '../../../../public/customers/claudy_logo_black.png'
import { InfiniteLooper } from '@components/common'
import { cn } from '@lib/utils'

const BrandLogo = (props: {
  image: StaticImageData
  alt: string
  url: string
}) => {
  return (
    <a
      target="_blank"
      className="relative w-full h-[120px] min-w-[120px] mx-4 sm:mx-6"
      href={props.url}
    >
      <Image
        src={props.image.src}
        alt={props.alt}
        layout="fill"
        objectFit="contain"
      />
    </a>
  )
}

interface Props {}

const CustomerLogoBanner = ({}: Props) => {
  return (
    <div
      className={cn(
        ' flex flex-col sm:flex-row items-center border-gray-950 overflow-x-hidden h-32',
      )}
    >
      <span className="hidden sm:flex justify-center absolute left-0 right-0">
        <InfiniteLooper speed={20}>
          <Logos />
        </InfiniteLooper>
      </span>

      <span className="w-full sm:hidden">
        <InfiniteLooper speed={20}>
          <Logos />
        </InfiniteLooper>
      </span>
    </div>
  )
}

const Logos = () => (
  <>
    <BrandLogo
      image={weworkLogo}
      alt="WeWork logo"
      url="https://www.wework.com"
    />
    <BrandLogo
      image={morningBrewLogo}
      alt="Morning Brew logo"
      url="https://www.morningbrew.com"
    />
    <BrandLogo
      image={johnnyHamcheckLogo}
      alt="Johnny Hamcheck logo"
      url="https://johnnyhamcheck.com/"
    />
    <BrandLogo
      image={haworthLogoBlack}
      alt="Haworth logo"
      url="https://www.haworth.com/"
    />
    <BrandLogo
      image={iscgLogo}
      alt="ISCG logo"
      url="https://www.iscginc.com/"
    />
    <BrandLogo
      image={lineleapLogo}
      alt="Lineleep logo"
      url="https://www.lineleap.com/"
    />
    <BrandLogo
      image={claudyLogoBlack}
      alt="Claudy logo"
      url="https://claudycompany.com/"
    />
    <BrandLogo
      image={greekDressingLogo}
      alt="Greek Dressing logo"
      url="https://greekhouse.org/"
    />
  </>
)

export default CustomerLogoBanner
