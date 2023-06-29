import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import { DesignRequestOverviewProductListDesignRequestProductFragment } from '@generated/DesignRequestOverviewProductListDesignRequestProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  products: DesignRequestOverviewProductListDesignRequestProductFragment[]
}

const DesignRequestOverviewProductList = ({ products }: Props) => {
  return (
    <div>
      {products.map(({ catalogProduct, colors }) => {
        return catalogProduct ? (
          <div
            key={catalogProduct.id}
            className="rounded-md shadow-sm border border-gray-50 p-4"
          >
            <Link
              target={'_blank'}
              className="text-sm flex items-center justify-between gap-4"
              href={
                catalogProduct.brand?.slug
                  ? routes.internal.catalog.product.href({
                      brandSlug: catalogProduct.brand.slug,
                      productSlug: catalogProduct.slug,
                    })
                  : '#'
              }
            >
              <div>
                <h3 className="font-semibold">{catalogProduct.name}</h3>
                <p className="text-gray-400">{catalogProduct.brand?.name}</p>
                <div>
                  {colors.map(color =>
                    color.hexCode ? (
                      <ColorSwatch
                        key={color.hexCode}
                        hexCode={color.hexCode}
                      />
                    ) : null,
                  )}
                </div>
              </div>
              {catalogProduct.primaryImage?.url ? (
                <img
                  className="aspect-square object-contain max-h-16"
                  src={catalogProduct.primaryImage.url}
                  alt={catalogProduct.name}
                />
              ) : null}
            </Link>
          </div>
        ) : null
      })}
    </div>
  )
}

DesignRequestOverviewProductList.fragments = {
  designRequestProduct: gql`
    fragment DesignRequestOverviewProductListDesignRequestProductFragment on DesignRequestProduct {
      id
      colors {
        hexCode
        name
      }
      catalogProduct {
        id
        name
        slug
        primaryImage {
          url
        }
        brand {
          id
          name
          slug
        }
      }
    }
  `,
}

export default DesignRequestOverviewProductList
