import { Bag, Heart, Paid, PaperPlane, Sun } from 'icons'
import React from 'react'

interface Props {}

const ValuePropositions = (props: Props) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ValueProposition
        title="Free Design"
        description="Partner with a designer on our team to make your vision come to life."
        icon={<Sun width={22} height={22} />}
      />
      <ValueProposition
        title="$1 Fulfillment"
        description="We'll efficiently store, pack, and ship your merchandise providing you cost savings, convenience, and unlimited scalability."
        icon={<PaperPlane width={22} height={22} />}
      />
      <ValueProposition
        title="Sell instantly"
        description="Effortlessly integrate with any eCommerce platform to sell your merchandise."
        icon={<Bag width={22} height={22} />}
      />
    </ul>
  )
}

const ValueProposition = ({
  title,
  description,
  icon,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <li className="p-4 bg-gray-600 flex gap-4 rounded-sm text-white">
      <div>{icon}</div>
      <div className="text-xs flex flex-col gap-2">
        <h3 className="font-bold">{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  )
}

export default ValuePropositions
