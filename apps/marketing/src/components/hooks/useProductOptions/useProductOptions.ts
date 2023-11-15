import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr'
import { UseProductColorsProductFragment } from '@generated/types'
import { notEmpty } from '@lib/utils/typescript'
import Color from 'color'
import fragments from './useProductOptions.fragments'

interface SwatchOptionValue {
  __typename: 'SwatchOptionValue'
  hexColors: string[]
  entityId: number
  label: string
}

interface MultipleChoiceOptionValue {
  __typename: 'MultipleChoiceOptionValue'
  label: string
  value: string
  entityId: number
}

interface Props {
  productId: string
}

const useProductOptions = ({ productId }: Props) => {
  const { data } = useFragment<UseProductColorsProductFragment>({
    fragment: fragments.product,
    fragmentName: 'UseProductColorsProductFragment',
    from: {
      __typename: 'Product',
      id: productId,
    },
  })

  let colors: SwatchOptionValue[] = []
  let sizes: MultipleChoiceOptionValue[] = []

  const productOptions =
    data?.productOptions?.edges?.map(edge => edge?.node) || []

  for (const option of productOptions) {
    if (option?.__typename === 'MultipleChoiceOption') {
      if (option.displayName === 'Color') {
        colors =
          (option.values?.edges
            ?.map(edge => edge?.node)
            .filter(option => option?.__typename === 'SwatchOptionValue')
            .sort((a, b) =>
              sortColors((a as any)?.hexColors[0], (b as any)?.hexColors[0]),
            )
            .filter(notEmpty) as SwatchOptionValue[]) || []
      }

      if (option.displayName === 'Size') {
        sizes =
          (option.values?.edges
            ?.map(edge => edge?.node)
            .filter(notEmpty) as unknown as MultipleChoiceOptionValue[]) || []
      }
    }
  }

  return { colors, sizes }
}

const sortColors = (hex1: string, hex2: string) => {
  // TODO(everest): Hack to path broken product catalog colors
  // https://linear.app/stitchi/issue/ENG-112/fix-product-color-swatch-codes-with-dropped-value
  if (hex1 === '#DROPPED' || hex2 === '#DROPPED') {
    return 0
  }

  let hslA = new Color(hex1).hsl().lightness()
  let hslB = new Color(hex2).hsl().lightness()

  return hslB - hslA
}

export default useProductOptions
