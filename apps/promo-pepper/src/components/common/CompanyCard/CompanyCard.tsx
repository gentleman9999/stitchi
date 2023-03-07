import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '@/components/ui'
import cx from 'classnames'

interface Company {
  id: string
  slug: string | null
  term: string
  definition: string
}

export interface Props {
  component?: React.ElementType
  company?: Company
  loading?: boolean
}

const CompanyCard = ({
  company,
  loading = false,
  component: Component = 'div',
}: Props) => {
  if (!loading && !company?.slug) {
    console.error('IndustryTermCard: missing slug', company)

    return null
  }

  const href = ''

  return (
    <Component
      id={loading ? undefined : company?.slug?.toString()}
      className={cx(
        'p-2 sm:border border-gray-800 grid grid-cols-12 rounded-md overflow-hidden',
        { '!border-gray-400 animate-pulse': loading },
      )}
    >
      <div className="col-span-12 sm:col-span-3 rounded-sm overflow-hidden">
        <Link
          href={href}
          className="relative w-full after:pb-[100%] after:block after:content-[''] bg-red-300"
        >
          {loading ? (
            <Skeleton className="h-full" />
          ) : (
            <Image
              fill
              src={`https://picsum.photos/400?random=${company?.id}`}
              style={{ objectFit: 'cover' }}
              alt="image test"
              key={company?.id}
            />
          )}

          {/* {company.primaryImage?.responsiveImage ? (

            <CmsImage
              data={company.primaryImage.responsiveImage}
              layout="fill"
              objectFit="cover"
            />
        ) : null} */}
        </Link>
      </div>

      <div className="sm:px-4 col-span-12 sm:col-span-9">
        <Link href={href}>
          <h2 className="text-3xl font-headingDisplay font-bold">
            {loading ? (
              <Skeleton className="w-[120px] h-7" />
            ) : (
              <>{company?.term}</>
            )}
          </h2>
        </Link>
        <p>
          {loading ? (
            <Skeleton className="h-4 mt-2" />
          ) : (
            <>{company?.definition}</>
          )}
        </p>
      </div>
    </Component>
  )
}

export default CompanyCard
