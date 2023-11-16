'use client'
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import CatalogWrapper from 'app/(app)/catalog/(grid)/CatalogWrapper'
import { BrandJsonLd } from 'next-seo'
import { GET_DATA } from './graphql'
import {
  BrandPageGetDataQuery,
  BrandPageGetDataQueryVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'

interface Props {
  path: string
}

const BrandPage = ({ path }: Props) => {
  const { data } = useSuspenseQuery<
    BrandPageGetDataQuery,
    BrandPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      path,
    },
  })

  const brand = data.site.route.node

  if (brand?.__typename !== 'Brand') {
    console.error('Brand should have been returned but wasn`t', {
      brand,
      path,
    })
    notFound()
  }

  const href = routes.internal.catalog.brand.show.href({
    brandSlug: brand.path,
  })

  const url = makeAbsoluteUrl(href)

  return (
    <>
      <BrandJsonLd useAppDir id={url} logo={brand.defaultImage?.url} />

      <CatalogWrapper brandEntityId={brand.entityId} />
    </>
  )
}

export default BrandPage
