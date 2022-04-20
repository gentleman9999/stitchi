import React from 'react'
import { notEmpty } from '@utils/typescript'
import SwatchGroup from './SwatchGroup'
import { gql } from '@apollo/client'
import {
  ProductColorOptionsProductFragment,
  ProductColorOptionsProductFragment_productOptions_edges_node,
  ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption,
  ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node,
  ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue,
} from '@generated/ProductColorOptionsProductFragment'

const isMultipleChoiceOption = (
  option?: ProductColorOptionsProductFragment_productOptions_edges_node,
): option is ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption => {
  return option?.__typename === 'MultipleChoiceOption'
}

const isSwatchOptionValue = (
  value?: ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node,
): value is ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue => {
  return value?.__typename === 'SwatchOptionValue'
}

interface Props {
  product: ProductColorOptionsProductFragment
}

const ProductColorOptions = ({ product }: Props) => {
  const colors =
    product.productOptions.edges
      ?.map(edge => edge?.node)
      .filter(isMultipleChoiceOption)
      .flatMap(option =>
        option.values.edges
          ?.map(edge => edge?.node)
          .filter(isSwatchOptionValue),
      )
      .filter(notEmpty) || []

  return (
    <SwatchGroup
      hexColors={colors?.map(({ hexColors }) => hexColors[0]) || []}
    />
  )
}

ProductColorOptions.fragments = {
  product: gql`
    fragment ProductColorOptionsProductFragment on Product {
      id
      productOptions {
        edges {
          node {
            ... on MultipleChoiceOption {
              displayName
              values {
                edges {
                  node {
                    ... on SwatchOptionValue {
                      label
                      hexColors
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
}

export default ProductColorOptions
