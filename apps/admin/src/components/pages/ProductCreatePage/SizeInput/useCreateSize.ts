import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  SizeCreateMutation,
  SizeCreateMutationVariables,
} from '@generated/SizeCreateMutation'
import { Schema } from './schema'

const useCreateSize = () => {
  const [loading, setLoading] = React.useState(false)
  const [createSize, mutation] = useMutation<
    SizeCreateMutation,
    SizeCreateMutationVariables
  >(CREATE_COLOR, {
    update(cache, { data }) {
      const { catalogId } = data?.sizeCreate?.size || {}

      if (catalogId) {
        cache.evict({
          id: cache.identify({ __typename: 'Catalog', id: catalogId }),
          fieldName: 'sizes',
        })
      }
    },
  })

  const create = async (input: Schema) => {
    setLoading(true)
    console.info('Starting to create size')

    const { data } = await createSize({ variables: { input } })

    if (!data?.sizeCreate) {
      throw new Error('No data returned')
    }

    const size = data.sizeCreate.size

    console.info('Size created', {
      context: { size },
    })

    setLoading(false)

    return size
  }

  return [create, { ...mutation, loading }] as const
}

const CREATE_COLOR = gql`
  mutation SizeCreateMutation($input: SizeCreateInput!) {
    sizeCreate(input: $input) {
      size {
        id
        catalogId
      }
    }
  }
`

export default useCreateSize
