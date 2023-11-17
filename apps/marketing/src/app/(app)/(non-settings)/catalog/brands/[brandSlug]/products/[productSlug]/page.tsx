import { Metadata } from 'next'
import { GET_DATA } from './graphql'
import { getClient } from '@lib/apollo-rsc'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'
import { makeProductTitle } from '@lib/utils/catalog'
import ProductShowPage from './ProductShowPage'
import routes from '@lib/routes'

interface Params {
  productSlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const { data } = await client.query<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      path: `/${params.productSlug}/`,
    },
  })

  const product = data?.site.route.node

  if (product?.__typename === 'Product') {
    // SEO Title shouldn't be the same as H1
    const title = `${makeProductTitle(product)}${
      product.sku ? ` - ${product.sku}` : ''
    }`

    let description

    if (product.seo.metaDescription) {
      description = product.seo.metaDescription
    }

    const { brand, name, path: productPath } = product

    description = `Customize ${name}${
      brand?.name ? ` by ${brand.name}` : ''
    }. We offer free design, fast delivery, $1 fulfillment. Shop sustainable, high quality custom merch today.`

    let images: NonNullable<Metadata['openGraph']>['images'] = []

    const { defaultImage: image } = product

    if (image) {
      images = [
        {
          url: image.seoImageUrl,
          width: 1000,
          alt: makeProductTitle(product),
        },
      ]
    }

    if (!brand || !productPath) {
      notFound()
    }

    return {
      title,
      description,
      openGraph: {
        description,
        title,
        images,
        url: routes.internal.catalog.product.href({
          brandSlug: brand.path.replaceAll('/', ''),
          productSlug: productPath.replaceAll('/', ''),
        }),
      },
    }
  }

  notFound()
}

const Page = ({ params }: { params: Params }) => {
  return <ProductShowPage path={`/${params.productSlug}/`} />
}

export default Page
