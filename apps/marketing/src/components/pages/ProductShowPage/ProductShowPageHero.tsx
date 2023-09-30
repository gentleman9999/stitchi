import { gql } from '@apollo/client'
import { ProductShowPageHeroProductFragment } from '@generated/ProductShowPageHeroProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'icons'
import { track } from '@lib/analytics'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import ProductFormOld, { FormValues } from './ProductFormOld'
import useProductShowPageHero from './useProductShowPageHero'
import { useRouter } from 'next/router'
import useProductOptions from '@components/hooks/useProductOptions'
import { DesignRequestCreateInput } from '@generated/globalTypes'
import { useLogger } from 'next-axiom'
import ProductForm from './ProductForm'

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  const logger = useLogger()
  const router = useRouter()
  const { colors } = useProductOptions({ product })

  const { handleCreateDesignRequest } = useProductShowPageHero({
    productEntityId: product.entityId,
    productName: product.name,
  })

  const handleSubmit = async (data: FormValues) => {
    const serializedColors: DesignRequestCreateInput['product']['colors'] = []

    data.colorEntityIds.forEach(colorEntityId => {
      const color = colors.find(color => color.entityId === colorEntityId)

      if (!color?.entityId) {
        return
      }

      serializedColors.push({
        catalogProductColorId: color.entityId.toString(),
        hexCode: color.hexColors[0],
        name: color.label,
      })
    })

    const designRequest = await handleCreateDesignRequest({
      colors: serializedColors,
    })

    if (!designRequest) {
      logger.error('Invariant error: designRequest is null')
      return
    }

    await router.push(
      routes.internal.closet.designs.show.href({
        designId: designRequest.id,
      }),
    )
  }

  return (
    <div className="w-full flex flex-col sm:flex-row relative">
      <div className="sm:h-[calc(100vh-56px)]  sticky top-[56px] sm:w-1/2">
        <CatalogProductVariantPreview product={product} />
      </div>
      <div className="sm:w-1/2">
        <ProductForm product={product} />
      </div>
    </div>
  )
}

ProductShowPageHero.fragments = {
  product: gql`
    ${CatalogProductVariantPreview.fragments.product}
    ${ProductFormOld.fragments.product}
    ${useProductOptions.fragments.product}
    ${ProductForm.fragments.product}
    fragment ProductShowPageHeroProductFragment on Product {
      ...CatalogProductVariantPreviewProductFragment
      ...ProductShowPageProductFormProductFragment
      ...ProductFormProductFragment
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
      ...UseProductColorsProductFragment
    }
  `,
}

export default ProductShowPageHero
