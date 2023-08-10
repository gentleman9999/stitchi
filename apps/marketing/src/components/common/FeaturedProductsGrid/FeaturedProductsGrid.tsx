import { gql } from '@apollo/client'
import { LinkInline } from '@components/ui'
import {
  FeaturedProductsGridCatalogFragment,
  FeaturedProductsGridCatalogFragment_featuredProducts_edges_node,
} from '@generated/FeaturedProductsGridCatalogFragment'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import { ArrowRight, ChevronRight } from 'icons'
import Image from 'next/legacy/image'
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
      <div className="border rounded-md shadow-magical">
        <div className="px-6 pt-6">
          <h2 className="capitalize font-medium text-2xl">Popular products</h2>
          <div className="flex">
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
        </div>
        <div className="px-6 pb-6 overflow-scroll no-scrollbar">
          <div className="flex gap-8 mt-6 w-full">
            {products?.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
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
    <div className="min-w-[150px] flex-1">
      <Link
        href={routes.internal.catalog.product.href({
          brandSlug: product.brand.path,
          productSlug: product.path,
        })}
      >
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
        <h3 className="font-medium font-heading text-center">{product.name}</h3>
      </Link>
    </div>
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
