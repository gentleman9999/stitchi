import { Section, SectionHeader } from '@components/common'
import React from 'react'

interface Props {}

const DistributionPageFeatures = (props: Props) => {
  return (
    <Section gutter="lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-1">
          <h2 className="font-bold text-3xl leading-tight">
            Services to meet any fulfillment needs.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-2">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Item
              title="$1 Order Fulfillment"
              description="Store your inventory at one of our fulfillment centers and let us handle the packing, shipping, and returns. Orders fulfilled within 24 hours."
            />
            <Item
              title="$29 eCommerce photography"
              description="Increase sales on your eCommerce store by providing your customers with beautiful, professional product shots."
            />
            <Item
              title="$1/mo per cubic foot inventory storage"
              description="Receive and store merchandise inventory at ultra-low rates. Save months setting up a warehouse or piling up merch in your parents garage."
            />
            <Item
              title="Free eCommerce integration"
              description="Our automated fulfillment solutions can integrate with any eCommerce platform. The moment an order is placed, fulfillment begins."
            />
          </ul>
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
  description: string
}) => {
  return (
    <li>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text text-gray-500 mt-2">{description}</p>
    </li>
  )
}

export default DistributionPageFeatures
