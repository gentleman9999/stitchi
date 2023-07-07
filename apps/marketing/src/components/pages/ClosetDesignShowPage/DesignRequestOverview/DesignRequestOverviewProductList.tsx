import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
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
          <Card key={catalogProduct.id}>
            <CardHeader>
              <CardTitle title="Products" />
            </CardHeader>
            <CardContent divide>
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
                  {colors.length ? (
                    <div className="mt-2 flex flex-wrap">
                      {colors.map(color =>
                        color.hexCode ? (
                          <ColorSwatch
                            key={color.hexCode}
                            hexCode={color.hexCode}
                            width="w-5"
                            height="h-5"
                          />
                        ) : null,
                      )}
                    </div>
                  ) : null}
                </div>
                {catalogProduct.primaryImage?.url ? (
                  <img
                    className="aspect-square object-contain max-h-16"
                    src={catalogProduct.primaryImage.url}
                    alt={catalogProduct.name}
                  />
                ) : null}
              </Link>
            </CardContent>
          </Card>
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
