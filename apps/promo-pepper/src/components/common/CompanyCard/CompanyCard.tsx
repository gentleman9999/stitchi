import React from 'react'
import Link from 'next/link'
import { gql } from '@apollo/client'
import Image from 'next/image'
// import CmsImage from '../CmsImage'

interface Company {
  id: string
  slug: string | null
  term: string
  definition: string
}

export interface Props {
  component?: React.ElementType
  company: Company
}

const CompanyCard = ({ company, component: Component = 'div' }: Props) => {
  if (!company.slug) {
    console.error('IndustryTermCard: missing slug', company)

    return null
  }

  const href = ''

  return (
    <Component
      id={company.slug?.toString()}
      key={company.id}
      className="sm:border-4 sm:border-b-0 border-gray-800 grid grid-cols-12 sm:last-of-type:border-b-4 last-of-type:rounded-b-md first-of-type:rounded-t-md overflow-hidden"
    >
      <div className="col-span-12 sm:col-span-3 sm:border-r-4 border-r-gray-800">
        <Link
          href={href}
          className="relative w-full after:pb-[100%] after:block after:content-[''] bg-red-300"
        >
          <Image
            fill
            src={`https://picsum.photos/400?random=${company.id}`}
            style={{ objectFit: 'cover' }}
            alt="image test"
            key={company.id}
          />
          {/* {company.primaryImage?.responsiveImage ? (

            <CmsImage
              data={company.primaryImage.responsiveImage}
              layout="fill"
              objectFit="cover"
            />
        ) : null} */}
        </Link>
      </div>

      <div className="py-8 sm:p-8 col-span-12 sm:col-span-9">
        <Link href={href}>
          <h2 className="text-3xl font-headingDisplay font-bold">
            {company.term}
          </h2>
        </Link>
        <br />
        <p>{company.definition}</p>
      </div>
    </Component>
  )
}

export default CompanyCard
