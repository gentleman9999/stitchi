import { gql } from '@apollo/client'
import {
  UseProductColorsProductFragment,
  UseProductColorsProductFragment_productOptions_edges_node as ProductOption,
  UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption as MultipleChoiceOption,
  UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node as MultipleChoiceOptionValue,
  UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue as SwatchOptionValue,
} from '@generated/UseProductColorsProductFragment'
import { notEmpty } from '@utils/typescript'
import Color from 'color'

interface Props {
  product: UseProductColorsProductFragment
}

const useProductOptions = ({ product }: Props) => {
  let colors: SwatchOptionValue[] = []
  let sizes: MultipleChoiceOptionValue[] = []

  const productOptions =
    product.productOptions.edges?.map(edge => edge?.node) || []

  for (const option of productOptions) {
    if (isMultipleChoiceOption(option)) {
      if (option.displayName === 'Color') {
        colors =
          option.values.edges
            ?.map(edge => edge?.node)
            .filter(isSwatchOptionValue)
            .sort((a, b) => sortColors(a.hexColors[0], b.hexColors[0])) || []
      }

      if (option.displayName === 'Size') {
        sizes =
          option.values.edges?.map(edge => edge?.node).filter(notEmpty) || []
      }
    }
  }

  return { colors, sizes }
}

const isMultipleChoiceOption = (
  option?: ProductOption,
): option is MultipleChoiceOption => {
  return option?.__typename === 'MultipleChoiceOption'
}

const isSwatchOptionValue = (
  value?: MultipleChoiceOptionValue,
): value is SwatchOptionValue => {
  return value?.__typename === 'SwatchOptionValue'
}

const sortColors = (hex1: string, hex2: string) => {
  let hslA = new Color(hex1).hsl().lightness()
  let hslB = new Color(hex2).hsl().lightness()

  return hslB - hslA
}

useProductOptions.fragments = {
  product: gql`
    fragment UseProductColorsProductFragment on Product {
      id
      productOptions {
        edges {
          node {
            ... on MultipleChoiceOption {
              displayName
              values {
                edges {
                  node {
                    entityId
                    label
                    ... on SwatchOptionValue {
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

export default useProductOptions
