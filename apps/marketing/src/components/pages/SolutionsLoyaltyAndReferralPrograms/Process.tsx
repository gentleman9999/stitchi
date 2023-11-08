import { Section, SectionHeader } from '@components/common'
import Image from 'next/image'
import React from 'react'
import babyImage from '../../../../public/industries/newsletter/example-tee-baby.jpg'

const Process = () => {
  return (
    <Section gutter="md">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Image
          {...babyImage}
          alt="Baby shirt example"
          style={{ width: '100%', height: '100%' }}
          className="rounded-lg max-w-md"
        />
        <div>
          <h2 className="text-4xl font-heading font-bold mb-4">Process</h2>
          <ul className="gap-8 grid">
            <Step
              title="Design products unique to your brand's voice"
              description="Work with a Stitchi designer to create a collection of products that accurately reflect your brand and connect with your audience. And best of all, designs are completely free."
            />
            <Step
              title="Launch automated referral program"
              description="Say goodbye to hiring additional interns. With Stitchi, we'll help you launch or integrate with an existing referral program and automate the entire process, saving you time and energy."
            />
            <Step
              title="Stitchi fulfillment"
              description="When your customers reach a referral milestone, we'll handle the fulfillment for you. Our team will pack and ship the rewards, giving you complete visibility into inventory, shipping times, and other key metrics to help you run your business smoothly."
            />
          </ul>
        </div>
      </div>
    </Section>
  )
}

const Step = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <li>
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </li>
  )
}

export default Process
