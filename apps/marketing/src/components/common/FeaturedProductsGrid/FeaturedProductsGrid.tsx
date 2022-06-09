import { gql } from '@apollo/client'
import { LinkInline } from '@components/ui'
import {
  FeaturedProductsGridCatalogFragment,
  FeaturedProductsGridCatalogFragment_featuredProducts_edges_node,
} from '@generated/FeaturedProductsGridCatalogFragment'
import routes from '@lib/routes'
import { notEmpty } from '@utils/typescript'
import { ArrowRight, ChevronRight } from 'icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Section from '../Section'
import SectionHeader from '../SectionHeader'

interface FeaturedProductsGridProps {
  catalog: FeaturedProductsGridCatalogFragment
}

const FeaturedProductsGrid = ({ catalog }: FeaturedProductsGridProps) => {
  const products = catalog.featuredProducts.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return (
    <Section gutter="md">
      <SectionHeader title="Popular products" />
      <div className="flex justify-center">
        <LinkInline
          href={routes.internal.catalog.href()}
          className="mt-4 no-underline flex items-center"
        >
          View catalog{' '}
          <span className="ml=2">
            <ArrowRight width={14} strokeWidth={2} />
          </span>
        </LinkInline>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-6">
        {products?.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Section>
  )
}

const Product = ({
  product,
}: {
  product: FeaturedProductsGridCatalogFragment_featuredProducts_edges_node
}) => {
  if (!product.brand?.path) return null
  return (
    <Link
      href={routes.internal.catalog.product.href({
        brandSlug: product.brand.path,
        productSlug: product.path,
      })}
    >
      <a>
        {product.defaultImage?.url && (
          <div className="relative w-full h-[200px]">
            <Image
              src={product.defaultImage.url}
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
        <h3 className="font-medium">{product.name}</h3>
      </a>
    </Link>
  )
}

FeaturedProductsGrid.fragments = {
  catalog: gql`
    fragment FeaturedProductsGridCatalogFragment on Site {
      featuredProducts {
        edges {
          node {
            id
            name
            path
            brand {
              id
              path
            }
            defaultImage {
              url(width: 200, height: 200)
            }
          }
        }
      }
    }
  `,
}

export default FeaturedProductsGrid
