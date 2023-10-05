import React from 'react'
import design from '../../../../public/design.png'
import fulfillment from '../../../../public/fulfillment.png'
import production from '../../../../public/production.png'
import Image from 'next/image'

const imageProps = {
  className:
    'rounded-md ring-2 ring-gray-950 shadow-magical max-w-[300px] max-h-[300px] md:max-w-[350px] md:max-h-[350px] lg:max-w-none lg:max-h-none lg:w-full',
}

interface Props {}

const HomePageFeaturedImages = (props: Props) => {
  return (
    <div className="py-10">
      <div className="flex flex-row justify-center lg:gap-8 w-screen py-1 overflow-hidden h-[85vh] md:max-h-screen md:h-[650px] lg:h-[600px] xl:h-[800px]">
        {/* First Image - aligned to the left */}
        <div className="flex flex-col justify-start items-start w-1/3">
          <Image src={design} alt="design" {...imageProps} />
        </div>

        {/* Second Image - centered */}
        <div className="flex flex-col justify-center items-center w-1/3">
          <Image src={production} alt="production" {...imageProps} />
        </div>

        {/* Third Image - aligned to the right */}
        <div className="flex flex-col justify-end items-end w-1/3">
          <Image src={fulfillment} alt="fulfillment" {...imageProps} />
        </div>
      </div>
    </div>
  )
}

export default HomePageFeaturedImages
