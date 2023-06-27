import { gql } from '@apollo/client'
import { ProductShowPageHeroProductFragment } from '@generated/ProductShowPageHeroProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'icons'
import { track } from '@lib/analytics'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import ProductForm, { FormValues } from './ProductForm'
import useProductShowPageHero from './useProductShowPageHero'
import { useRouter } from 'next/router'

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  const router = useRouter()
  const { handleCreateDesignRequest } = useProductShowPageHero({
    productEntityId: product.entityId,
    productName: product.name,
  })

  const handleSubmit = async (data: FormValues) => {
    const designRequest = await handleCreateDesignRequest({
      colorEntityIds: data.colorEntityIds,
    })

    if (!designRequest) {
      console.error('Invariant error: designRequest is null')
      return
    }

    await router.push(
      routes.internal.closet.designs.show.href({
        designId: designRequest.id,
      }),
    )
  }

  return (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-10">
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex flex-col gap-4">
        <CatalogProductVariantPreview product={product} />
      </div>

      <div className="col-span-12 sm:col-span-6 lg:col-span-5">
        <div className="sticky top-24 flex flex-col gap-6">
          <div className="p-6 border rounded-sm @container">
            <ProductForm onSubmit={handleSubmit} product={product} />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm">
              Elevate your brand by collaborating with one of our skilled
              designers at no additional cost!
            </span>
            <Link
              href={routes.internal.getStarted.href()}
              className="flex items-center underline font-medium"
              onClick={() =>
                track.productCustomDesignClicked({ name: product.name })
              }
            >
              Work with a designer{' '}
              <ArrowRight width={16} className="stroke-2 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductShowPageHero.fragments = {
  product: gql`
    ${CatalogProductVariantPreview.fragments.product}
    ${ProductForm.fragments.product}
    fragment ProductShowPageHeroProductFragment on Product {
      ...CatalogProductVariantPreviewProductFragment
      ...ProductShowPageProductFormProductFragment
      id
      entityId
      name
      path

      defaultImage {
        urlOriginal
        altText
        url(width: 300)
      }
      brand {
        id
        path
      }

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            entityId
          }
        }
      }
    }
  `,
}

export default ProductShowPageHero
