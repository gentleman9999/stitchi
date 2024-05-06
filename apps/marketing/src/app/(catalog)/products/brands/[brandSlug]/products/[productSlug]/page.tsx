import { Metadata } from 'next'
import { GET_DATA } from './graphql'
import { getClient } from '@lib/apollo-rsc'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
} from '@generated/types'
import { notFound, redirect } from 'next/navigation'
import ProductShowPage from './ProductShowPage'
import routes from '@lib/routes'

interface Params {
  brandSlug: string
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

  if (product?.__typename !== 'Product') {
    redirect(
      routes.internal.catalog.brand.show.href({
        brandSlug: params.brandSlug,
      }),
    )
  } else {
    const { brand, humanizedName, path: productPath } = product

    // SEO Title shouldn't be the same as H1
    const title = `${
      product.brand ? `${product.brand.name} ` : ''
    }${humanizedName}${product.sku ? ` - ${product.sku}` : ''}`

    let description

    if (product.seo.metaDescription) {
      description = product.seo.metaDescription
    } else {
      description = `Customize ${humanizedName}${
        brand?.name ? ` by ${brand.name}` : ''
      } (${
        product.sku
      }). We offer free design, fast delivery, $1 fulfillment. Shop sustainable, high quality custom merch today.`
    }

    let images: NonNullable<Metadata['openGraph']>['images'] = []

    const { defaultImage: image } = product

    if (image) {
      images = [
        {
          url: image.seoImageUrl,
          width: 1000,
          alt: product.humanizedName,
        },
      ]
    }

    if (!productPath) {
      notFound()
    }

    const url = routes.internal.catalog.product.href({
      productSlug: productPath.replaceAll('/', ''),
    })

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      // Images generated from opengraph-image.tsx
      openGraph: {
        description,
        title,
        url: url,
      },
      twitter: {
        card: 'summary_large_image',
      },
    }
  }
}

const Page = ({ params }: { params: Params }) => {
  return (
    <ProductShowPage
      brandSlug={params.brandSlug}
      path={`/${params.productSlug}/`}
    />
  )
}

export default Page
