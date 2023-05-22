import { gql, useQuery } from '@apollo/client'
import { Container } from '@components/ui'
import {
  ProductBuyPageGetDataQuery,
  ProductBuyPageGetDataQueryVariables,
} from '@generated/ProductBuyPageGetDataQuery'
import routes from '@lib/routes'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import Form from './Form'

interface Props {
  productSlug: string
}

const ProductBuyPage = (props: Props) => {
  const router = useRouter()
  const { data, loading, error } = useQuery<
    ProductBuyPageGetDataQuery,
    ProductBuyPageGetDataQueryVariables
  >(GET_DATA, { variables: { path: props.productSlug } })

  const product = data?.site.route.node

  if (product && product?.__typename !== 'Product') {
    console.error(
      `Invalid node type passed to product page: ${product?.__typename}. Redirecting to catalog...`,
    )
    router.push(routes.internal.catalog.href())
  }

  return (
    <>
      <NextSeo nofollow noindex />
      <Container>
        <Form onSubmit={() => {}} productVariantEntityId={0} />
      </Container>
    </>
  )
}

const GET_DATA = gql`
  query ProductBuyPageGetDataQuery($path: String!) {
    site {
      route(path: $path) {
        node {
          id

          ... on Product {
            id
          }
        }
      }
    }
  }
`

export default ProductBuyPage
