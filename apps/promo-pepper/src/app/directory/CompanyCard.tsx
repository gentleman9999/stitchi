import React from 'react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui'
import cx from 'classnames'
import routes from '@/lib/routes'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import CmsImage from '../../components/common/CmsImage'

export interface Props {
  component?: React.ElementType
  companyData?: FragmentType<typeof CompanyCardCompany>
  loading?: boolean
}

const CompanyCard = ({
  companyData,
  loading = false,
  component: Component = 'div',
}: Props) => {
  const company = getFragmentData(CompanyCardCompany, companyData)

  if (!loading && !company?.slug) {
    console.error('IndustryTermCard: missing slug', company)

    return null
  }

  const href = company?.slug
    ? routes.internal.directory.companies.show.href({
        companySlug: company.slug,
      })
    : null

  return (
    <Component
      id={loading ? undefined : company?.slug?.toString()}
      className={cx(
        'p-2 sm:border border-gray-800 grid grid-cols-12 rounded-md overflow-hidden',
        { '!border-gray-400 animate-pulse': loading },
      )}
    >
      <div className="border sm:border-none col-span-12 sm:col-span-3 rounded-md overflow-hidden">
        <Link
          href={href || '#'}
          className="relative w-full after:pb-[100%] after:block after:content-['']"
        >
          {loading ? (
            <Skeleton className="h-full" />
          ) : company?.primaryImage?.responsiveImage ? (
            <CmsImage
              data={company.primaryImage.responsiveImage}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </Link>
      </div>

      <div className="sm:px-4 col-span-12 sm:col-span-9">
        <Link href={href || ''}>
          <h2 className="text-3xl font-headingDisplay font-bold">
            {loading ? (
              <Skeleton className="w-[120px] h-7" />
            ) : (
              <>{company?.name}</>
            )}
          </h2>
        </Link>
        {loading ? (
          <Skeleton className="h-4 mt-2" />
        ) : (
          <p>{company?.definition}</p>
        )}
      </div>
    </Component>
  )
}

export default CompanyCard

export const CompanyCardCompany = gql(/* GraphQL */ `
  fragment CompanyCardCompany on GlossaryEntryRecord {
    id
    slug
    name: term
    definition
    primaryImage {
      id
      responsiveImage {
        ...CmsImage
      }
    }
  }
`)
