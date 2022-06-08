import React from 'react'
import { Section, SectionHeader } from '@components/common'
import Image from 'next/image'
import shippingWarehouse from '../../../../public/shipping_warehouse.png'

interface Props {}

const DistributionPageAdvantages = (props: Props) => {
  return (
    <Section gutter="lg">
      <SectionHeader
        pretitle="why 3rd party logistics?"
        title="Scale effortlessly, zero burden"
        subtitle="We enable brands to scale their eCommerce and access cutting-edge fulfillment services at a completely transparent, industry-low rate."
      />
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="sm:order-last">
          <Image src={shippingWarehouse} alt="Shipping warehouse rendering" />
        </div>
        <ul className="grid gap-10">
          <Item
            title="Fast and reliable"
            description="Your customers deserve speed and accuracy from the business they purchase from. We combine all fulfillment process under a single roof to drive not only value but efficiency."
          />
          <Item
            title="Industry expertise"
            description="Our decades of industry expertise help minimize risk and ensure you deliver a consistent merch experience. We are cable of developing global, end-to-end order management and fulfillment programs."
          />
          <Item
            title="Reduce costs"
            description="Leveraging 3rd party logistics can reduce costs tremendously through bulk shipping discounts, specialized equipment and dedicated support."
          />
        </ul>
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

export default DistributionPageAdvantages
