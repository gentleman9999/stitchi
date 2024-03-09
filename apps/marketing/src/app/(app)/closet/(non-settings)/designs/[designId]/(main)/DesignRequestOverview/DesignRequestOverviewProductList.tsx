import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import ButtonV2 from '@components/ui/ButtonV2'
import { Card, CardContent } from '@components/ui/Card'
import { DesignRequestOverviewProductListDesignRequestProductFragment } from '@generated/DesignRequestOverviewProductListDesignRequestProductFragment'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  product: DesignRequestOverviewProductListDesignRequestProductFragment
}

const DesignRequestOverviewProductList = ({ product }: Props) => {
  const { catalogProduct, colors } = product

  if (!catalogProduct) return null

  return (
    <div>
      <Card key={catalogProduct.id}>
        {catalogProduct.primaryImage?.url ? (
          <div className="flex justify-center w-full">
            <img
              className="aspect-square object-contain w-full max-h-60"
              src={catalogProduct.primaryImage.url}
              alt={catalogProduct.name}
            />
          </div>
        ) : null}

        <CardContent>
          <Link
            target={'_blank'}
            className="text-sm flex flex-col gap-4"
            href={
              catalogProduct.brand?.slug
                ? routes.internal.catalog.product.href({
                    productSlug: catalogProduct.slug,
                  })
                : '#'
            }
          >
            <div className="flex flex-col">
              <h3 className="font-semibold">{catalogProduct.name}</h3>
              <p className="text-gray-400">{catalogProduct.brand?.name}</p>
              {colors.length ? (
                <div className="mt-2 flex flex-wrap">
                  {colors.map(color =>
                    color.hexCode ? (
                      <ColorSwatch
                        key={color.hexCode}
                        hexCode={color.hexCode}
                        label={color.name}
                        width="w-5"
                        height="h-5"
                      />
                    ) : null,
                  )}
                </div>
              ) : null}
            </div>

            <div className="border-t pt-6">
              <ButtonV2
                variant="naked"
                endIcon={<ArrowRightIcon className="w-4 h-4" />}
              >
                View product
              </ButtonV2>
            </div>
          </Link>
        </CardContent>
      </Card>
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
