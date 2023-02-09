import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { ProductShowPage } from '@components/pages'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
  ProductPageGetDataQuery_site_route_node_Product,
} from '@generated/ProductPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ReactElement } from 'react'
import staticWebsiteData from '@generated/static.json'
import {
  NextSeo,
  NextSeoProps,
  ProductJsonLd,
  ProductJsonLdProps,
} from 'next-seo'
import { makeProductTitle } from '@utils/catalog'
import { OpenGraphMedia } from 'next-seo/lib/types'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import routes from '@lib/routes'
import { notEmpty } from '@utils/typescript'

const allBrandSlugs = staticWebsiteData.data.site.brands.edges.map(({ node }) =>
  node.path.replace(/\//g, ''),
)

const makeImages = (
  product: ProductPageGetDataQuery_site_route_node_Product,
): OpenGraphMedia[] => {
  const { defaultImage: image } = product
  if (!image) {
    return []
  }

  return [
    {
      url: image.seoImageUrl,
      width: 1000,
      alt: makeProductTitle(product),
    },
  ]
}

const getBigCProductPathFromSlug = (slug: string) => {
  const brandSlug = allBrandSlugs.find(
    brandSlug => slug.indexOf(brandSlug) === 0,
  )

  if (!brandSlug) {
    return null
  }

  const productSlug = slug.replace(`${brandSlug}-`, '')

  return `/${productSlug}/`
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { catchAllSlug } = params || {}

  if (!catchAllSlug || typeof catchAllSlug !== 'string') {
    return {
      notFound: true,
    }
  }

  const productPath = getBigCProductPathFromSlug(catchAllSlug)

  if (!productPath) {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  await client.query<ProductPageGetDataQuery, ProductPageGetDataQueryVariables>(
    {
      query: GET_DATA,
      variables: { path: productPath },
    },
  )

  return addApolloState(client, { props: {} })
}

const ProductPage = () => {
  const { query } = useRouter()
  const { catchAllSlug } = query

  const productPath = getBigCProductPathFromSlug(catchAllSlug?.toString() || '')

  const { data, error } = useQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { path: productPath || '' },
  })

  const { site } = data || {}

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  if (!site) {
    throw new Error("No site found. This shouldn't happen.")
  }

  const product = site.route.node

  if (!product || product.__typename !== 'Product') {
    return <ComponentErrorMessage error="No product found" />
  }

  const title = makeProductTitle(product)

  const url = makeAbsoluteUrl(
    routes.internal.catalog.product.href({
      brandSlug: product.brand?.path || '',
      productSlug: product.path,
    }),
  )

  const seoProps: NextSeoProps = {
    canonical: url,
    title,
    description: product.seo.metaDescription || product.plainTextDescription,
    openGraph: {
      title,
      url,
      images: makeImages(product),
    },
  }

  const jsonLDData: (ProductJsonLdProps & { id: string })[] =
    product.variants.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty)
      .map(variant => {
        console.log()

        const color = variant.options.edges
          ?.map(edge => edge?.node)
          .find(option => option?.displayName === 'Color')
          ?.values.edges?.map(edge => edge?.node)
          .filter(notEmpty)[0].label

        return {
          color,
          id: variant.id,
          productName: product.name,
          description: product.plainTextDescription,
          brand: product.brand?.name,
          images: variant.defaultImage ? [variant.defaultImage.url] : [],
          sku: variant.sku,
          mpn: variant.mpn || undefined,
          offers: variant.prices
            ? {
                url,
                price: variant.prices.price.value,
                priceCurrency: variant.prices.price.currencyCode,
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
                seller: {
                  name: 'Stitchi',
                },
              }
            : undefined,
        }
      }) || []

  return (
    <>
      <NextSeo {...seoProps} />
      {jsonLDData.map(props => (
        <ProductJsonLd {...props} key={props.id} />
      ))}

      <ProductShowPage product={product} />
    </>
  )
}

ProductPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${ProductShowPage.fragments.product}
  query ProductPageGetDataQuery($path: String!) {
    site {
      route(path: $path) {
        node {
          id
          ... on Product {
            name
            path
            plainTextDescription
            defaultImage {
              seoImageUrl: url(width: 1000)
            }
            brand {
              id
              name
              path
            }
            seo {
              metaDescription
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  gtin
                  mpn
                  sku
                  prices {
                    price {
                      currencyCode
                      value
                    }
                  }
                  options {
                    edges {
                      node {
                        displayName
                        values {
                          edges {
                            node {
                              label
                            }
                          }
                        }
                      }
                    }
                  }
                  jsonLdImage: defaultImage {
                    url(width: 700)
                  }
                }
              }
            }
            ...ProductShowPageProductFragment
          }
        }
      }
    }
  }
`

export default ProductPage
