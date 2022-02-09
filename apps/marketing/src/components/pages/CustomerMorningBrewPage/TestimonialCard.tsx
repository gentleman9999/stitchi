import React from 'react'
import Image from 'next/image'
import heroImage from '../../../../public/customers/morning_brew/morning_brew_referral_program_giveaway_2.png'
import morningBrewLogoImage from '../../../../public/customers/morning_brew/morning_brew_logo.png'
import { Spokesperson, useSpokesperson } from '@components/common'

const TestimonialCard = () => {
  const jenny = useSpokesperson('jenny_rothenberg')

  return (
    <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-blend-darken grayscale-[20%] sepia-[20%] brightness-50">
        {/* <Image
          {...heroImage}
          layout="fill"
          objectFit="cover"
          alt="Morning Brew Referral Program Giveaway"
        /> */}
      </div>

      <div className="absolute inset-0 bg-rose-500 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-600 via-rose-600 opacity-90" />
      <div className="relative px-8">
        <div className="relative h-12">
          <Image
            {...morningBrewLogoImage}
            layout="fill"
            objectFit="contain"
            alt="Morning Brew logo"
          />
        </div>
        <blockquote className="mt-8">
          <div className="relative text-lg font-medium text-gray-600 md:flex-grow">
            <svg
              className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-rose-400"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="relative">
              We shipped over 8,000 pairs of Morning Brew joggers to our loyal
              readers, resulting in over 75,000 new subscribers. This was our
              largest growth campaign to date and we love seeing pictures of our
              readers wearing their MB joggers on social media.
            </p>
          </div>

          <footer className="mt-4">
            <Spokesperson {...jenny} />
          </footer>
        </blockquote>
      </div>
    </div>
  )
}

export default TestimonialCard
