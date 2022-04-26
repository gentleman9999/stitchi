import { gql } from '@apollo/client'
import {
  UseProductColorsProductFragment,
  UseProductColorsProductFragment_productOptions_edges_node,
  UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption,
  UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node,
  UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue,
} from '@generated/UseProductColorsProductFragment'
import { notEmpty } from '@utils/typescript'

interface Props {
  product: UseProductColorsProductFragment
}

const useProductColors = ({ product }: Props) => {
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

  return { colors }
}

const isMultipleChoiceOption = (
  option?: UseProductColorsProductFragment_productOptions_edges_node,
): option is UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption => {
  return option?.__typename === 'MultipleChoiceOption'
}

const isSwatchOptionValue = (
  value?: UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node,
): value is UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue => {
  return value?.__typename === 'SwatchOptionValue'
}

useProductColors.fragments = {
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
                    ... on SwatchOptionValue {
                      label
                      hexColors
                      entityId
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

export default useProductColors
