import routes from '@lib/routes'
import { Bag, PaperPlane, Sun } from 'icons'
import Link from 'next/link'
import React from 'react'

interface Props {}

const ValuePropositions = (props: Props) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ValueProposition
        title="Expertly Crafted"
        description="Partner with a designer on our team for free to make your vision come to life."
        icon={<Sun width={22} height={22} />}
        href={routes.internal.solutions.design.href()}
        cta="Learn about design"
      />
      <ValueProposition
        title="$1 Fulfillment"
        description="We'll efficiently store, pack, and ship your merchandise providing you cost savings, convenience, and unlimited scalability."
        icon={<PaperPlane width={22} height={22} />}
        href={routes.internal.solutions.distribution.href()}
        cta="Learn about fulfillment"
      />
      <ValueProposition
        title="Delivered Anywhere"
        description="Effortlessly sell your merchandise online with e-commerce integrations, team stores, and presales."
        icon={<Bag width={22} height={22} />}
        href={routes.internal.solutions.distribution.href()}
        cta="Learn about distribution"
      />
    </ul>
  )
}

const ValueProposition = ({
  title,
  description,
  icon,
  href,
  cta,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  cta: string
}) => {
  return (
    <li className="p-6 bg-midnight flex gap-4 rounded-sm text-gray-100 ">
      <div className="">{icon}</div>
      <div className="text-xs flex flex-col gap-2">
        <h3 className="font-bold ">{title}</h3>
        <p>{description}</p>
        <Link href={href} className="underline">
          {cta}
        </Link>
      </div>
    </li>
  )
}

export default ValuePropositions
