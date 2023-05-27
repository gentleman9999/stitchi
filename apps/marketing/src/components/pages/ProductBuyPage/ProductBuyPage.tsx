import { gql, useQuery } from '@apollo/client'
import { Section } from '@components/common'
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

  // Select product variants (colors, size, quantity)
  // Gather art requirements

  const colorOptions = [
    { label: 'Black', value: 'black', hex: '#000000' },
    { label: 'White', value: 'white', hex: '#ffffff' },
    { label: 'Red', value: 'red', hex: '#ff0000' },
  ]

  const sizeOptions = [
    { label: 'X-Small', value: 'x-small' },
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'X-Large', value: 'x-large' },
  ]

  const columns = sizeOptions.length + 2

  return (
    <>
      <NextSeo nofollow noindex />
      <Container>
        <Section>
          <div className="w-full grid grid-flow-col">
            <div className="w-24" />
            {sizeOptions.map(size => (
              <div key={size.value}>{size.label}</div>
            ))}
          </div>
          <ul className="">
            {colorOptions.map(color => (
              <li
                key={color.value}
                className="border rounded-md my-2 px-2 grid grid-flow-col"
              >
                <div className="w-full grid grid-flow-col">
                  <div className="flex items-center text-sm font-medium w-24">
                    <div
                      className="w-6 h-6 rounded-full border mr-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.label}
                  </div>
                  {sizeOptions.map(size => (
                    <div key={size.value} className="p-1">
                      <input className="w-full outline outline-gray-100 rounded-sm text-center py-1" />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <Form onSubmit={() => {}} productVariantEntityId={0} />
        </Section>
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
