import { ProductPageGetDataQuery } from '@generated/types'
import { ImageResponse } from 'next/og'
import getOrThrow from '@lib/utils/get-or-throw'
import { NextResponse } from 'next/server'
import { theme } from '../../../../../../../../tailwind.config'
import { SITE_URL } from '@lib/constants'
import currency from 'currency.js'

const graphqlEndpoint = getOrThrow(
  process.env.NEXT_PUBLIC_STITCHI_GRAPHQL_URI,
  'NEXT_PUBLIC_STITCHI_GRAPHQL_URI',
)

export const runtime = 'edge'

export default async function Image({
  params,
}: {
  params: { productSlug: string }
}) {
  let data: ProductPageGetDataQuery | undefined
  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any additional headers like authentication tokens if needed
      },
      body: JSON.stringify({
        query: `
          query ProductPageOpenGraphImageGetDataQuery($path: String!) {
            site {
              route(path: $path) {
                node {
                  id
                  __typename
                  ... on Product {
                    name
                    defaultImage {
                      url(width: 1000)
                    }
                    priceMetadata {
                      minPriceCents
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          path: `/${params.productSlug}/`,
        },
      }),
    })

    data = (await response.json()).data

    if (!data) {
      throw new Error('No data')
    }
  } catch (error) {
    console.error('Error fetching product OG image data:', error)
  }

  const product = data?.site.route.node

  if (product?.__typename === 'Product') {
    return new ImageResponse(
      (
        <div tw="h-full w-full flex items-start justify-start bg-white">
          <div tw="flex items-start justify-start h-full">
            <div tw="flex w-2/5 flex-col justify-between h-full pl-12 py-12">
              <div tw="flex flex-col">
                <p tw="text-2xl font-bold mb-0 text-gray-600">{SITE_URL}</p>
                <h1 tw="text-5xl font-black text-left">{product.name}</h1>
              </div>
              <p
                style={{
                  backgroundColor: theme.colors.primary,
                }}
                tw="text-3xl font-bold text-black py-4 px-12 rounded-lg"
              >
                Starting at{' '}
                {currency(product.priceMetadata.minPriceCents, {
                  fromCents: true,
                }).format()}
              </p>
            </div>
            {product.defaultImage?.url ? (
              <div tw="flex w-3/5 h-full">
                <img
                  tw="w-full h-full"
                  style={{ objectFit: 'contain' }}
                  src={product.defaultImage.url}
                />
              </div>
            ) : null}
          </div>
        </div>
      ),
      {
        debug: true,
        width: 1200,
        height: 627,
      },
    )
  }

  return new NextResponse('Not Found', {
    status: 404,
    statusText: 'Not Found',
  })
}
