import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  UseCreateProductHookCreateMaterialtMutation,
  UseCreateProductHookCreateMaterialtMutationVariables,
} from '@generated/UseCreateProductHookCreateMaterialtMutation'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import { Schema } from './schema'

const useCreateProduct = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [createProduct, mutation] = useMutation<
    UseCreateProductHookCreateMaterialtMutation,
    UseCreateProductHookCreateMaterialtMutationVariables
  >(CREATE_PRODUCT)

  const handleCreate = async (input: Schema) => {
    setLoading(true)
    console.info('Starting to create product')

    const { data } = await createProduct({ variables: { input } })

    if (!data?.materialCreate) {
      throw new Error('No data returned')
    }

    const product = data.materialCreate.material

    console.info('Product created', {
      context: { product },
    })

    await router.push(routes.internal.products.show.href(product.id))

    setLoading(false)
  }

  return [handleCreate, { ...mutation, loading }] as const
}

export default useCreateProduct

const CREATE_PRODUCT = gql`
  mutation UseCreateProductHookCreateMaterialtMutation(
    $input: MaterialCreateInput!
  ) {
    materialCreate(input: $input) {
      material {
        id
      }
    }
  }
`
