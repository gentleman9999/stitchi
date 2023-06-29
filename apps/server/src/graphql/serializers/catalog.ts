import {
  CatalogFactoryBrand,
  CatalogFactoryCatalogProduct,
} from '../../services/catalog/factory'
import { NexusGenObjects } from '../generated/nexus'

export const catalogProductFactoryToGraphQl = ({
  catalogProduct,
}: {
  catalogProduct: CatalogFactoryCatalogProduct
}): NexusGenObjects['CatalogProduct'] => {
  return {
    id: catalogProduct.id,
    brandId: catalogProduct.brandId,
    categoryIds: catalogProduct.categoryIds,
    relatedProductIds: catalogProduct.relatedProductIds,

    slug: catalogProduct.slug,
    name: catalogProduct.name,
    description: catalogProduct.description,
    priceCents: catalogProduct.priceCents,
    visible: catalogProduct.visible,
    images: catalogProduct.images,
    primaryImage: catalogProduct.primaryImage,

    createdAt: catalogProduct.createdAt,
    updatedAt: catalogProduct.updatedAt,
  }
}

export const catalogBrandFactoryToGraphQl = ({
  catalogBrand,
}: {
  catalogBrand: CatalogFactoryBrand
}): NexusGenObjects['CatalogBrand'] => {
  return {
    id: catalogBrand.id,
    name: catalogBrand.name,
    slug: catalogBrand.slug,
  }
}
