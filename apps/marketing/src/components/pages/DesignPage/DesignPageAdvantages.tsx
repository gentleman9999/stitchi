import { Section } from '@components/common'
import Image from 'next/image'
import React from 'react'
import DesignPageSectionHeader from './DesignPageSectionHeader'
import closetRendering from '../../../../public/greek_life_custom_swag.jpg'

const DesignPageAdvantages = () => {
  return (
    <Section gutter="sm">
      <DesignPageSectionHeader
        pretitle="Stitchi Advantage"
        title="Everything you asked for"
      />

      <div className="rounded-md overflow-hidden mt-6">
        <Image
          src={closetRendering}
          layout="intrinsic"
          alt="Custom swag collection"
        />

        <div className="bg-secondaryAlt-100 py-6 px-4 md:py-10 md:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-10 mt-8">
          <Item
            title="Better designs"
            description="Always up-to-date with the latest trends and styles. We combine your brand and campaign objectives to design swag that resonates with your audience."
          />
          <Item
            title="Save money and time"
            description="We provide free (yes, free) designs in less than 24 hours. With a dedicated designer, creating great promotional products has never been easier."
          />
          <Item
            title="Seamless coordination"
            description="Easily share mockups with your team and collaborate on feedback. Once finalized, designs are immediately ready for production."
          />
        </div>
      </div>
    </Section>
  )
}

const Item = ({
  title,
  description,
}: {
  title: string
  description: React.ReactNode
}) => {
  return (
    <div>
      <h3 className="text sm:text-lg lg:text-xl font-semibold text-secondaryAlt-900">
        {title}
      </h3>
      <p className="text-secondaryAlt-600 text-sm md:text-base mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default DesignPageAdvantages
