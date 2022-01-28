import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

const stats = [
  {
    label: 'Gained Subscribers',
    value: '75,000',
  },
  { label: 'Lowered Customer Acquisition Cost', value: '29.4%' },
  { label: 'Brand evangelists', value: '8,000' },
]

const StatsSection = () => {
  return (
    <div className="mt-10">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
        {stats.map(stat => (
          <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
            <dt className="text-base font-medium text-gray-500">
              {stat.label}
            </dt>
            <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-10">
        <Link href={routes.internal.getStarted.href()}>
          <a className="font-medium text-tertiary">
            Learn how to level up your swag &nbsp; &rarr;
          </a>
        </Link>
      </div>
    </div>
  )
}

export default StatsSection
