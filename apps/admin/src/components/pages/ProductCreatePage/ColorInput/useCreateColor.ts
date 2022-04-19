import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  ColorCreateMutation,
  ColorCreateMutationVariables,
} from '@generated/ColorCreateMutation'
import { Schema } from './schema'

const useCreateColor = () => {
  const [loading, setLoading] = React.useState(false)
  const [createColor, mutation] = useMutation<
    ColorCreateMutation,
    ColorCreateMutationVariables
  >(CREATE_COLOR, {
    update(cache, { data }) {
      const { catalogId } = data?.colorCreate?.color || {}

      if (catalogId) {
        cache.evict({
          id: cache.identify({ __typename: 'Catalog', id: catalogId }),
          fieldName: 'colors',
        })
      }
    },
  })

  const create = async (input: Schema) => {
    setLoading(true)
    console.info('Starting to create color')

    const { data } = await createColor({ variables: { input } })

    if (!data?.colorCreate) {
      throw new Error('No data returned')
    }

    const color = data.colorCreate.color

    console.info('Color created', {
      context: { color },
    })

    setLoading(false)

    return color
  }

  return [create, { ...mutation, loading }] as const
}

const CREATE_COLOR = gql`
  mutation ColorCreateMutation($input: ColorCreateInput!) {
    colorCreate(input: $input) {
      color {
        id
        catalogId
      }
    }
  }
`

export default useCreateColor
