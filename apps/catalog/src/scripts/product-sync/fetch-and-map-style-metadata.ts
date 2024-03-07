import { isAfter } from 'date-fns'
import { BigCommerceSdk } from '../../sdk'
import { BigCommerceProductMetadata } from '../../sdk/bigcommerce/types'

const fetchAndMapStyleMetadata = async ({
  bigCommerce,
}: {
  bigCommerce: BigCommerceSdk
}) => {
  let page = 1
  let hasNextPage = true

  const allBigCommerceSkuMetadata: BigCommerceProductMetadata[] = []

  while (hasNextPage) {
    const { metadata, pagination } = await bigCommerce.listProductsMetadata({
      limit: 250,
      page: page,
      metadataKey: 'style_id',
    })

    allBigCommerceSkuMetadata.push(...metadata)

    hasNextPage = pagination.hasNextPage
    page++
  }

  const metadataMap = new Map<string, BigCommerceProductMetadata>()

  for (const metadata of allBigCommerceSkuMetadata) {
    const key = metadata.value
    const currentVal = metadataMap.get(key)

    if (
      !currentVal ||
      isAfter(
        new Date(metadata.dateModified),
        new Date(currentVal.dateModified),
      )
    ) {
      metadataMap.set(key, metadata)
    }
  }

  return metadataMap
}

export default fetchAndMapStyleMetadata
