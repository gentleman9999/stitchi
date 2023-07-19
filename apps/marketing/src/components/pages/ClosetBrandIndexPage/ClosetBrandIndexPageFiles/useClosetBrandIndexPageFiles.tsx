import { gql, useMutation } from '@apollo/client'
import {
  OrganizationBrandFileCreateBatchInput,
  OrganizationBrandFileDeleteBatchInput,
} from '@generated/globalTypes'
import {
  UseClosetBrandIndexPageCreateFilesMutation,
  UseClosetBrandIndexPageCreateFilesMutationVariables,
} from '@generated/UseClosetBrandIndexPageCreateFilesMutation'
import {
  UseClosetBrandIndexPageDeleteFilesMutation,
  UseClosetBrandIndexPageDeleteFilesMutationVariables,
} from '@generated/UseClosetBrandIndexPageDeleteFilesMutation'

const useClosetBrandIndexPageFiles = () => {
  const [createFiles] = useMutation<
    UseClosetBrandIndexPageCreateFilesMutation,
    UseClosetBrandIndexPageCreateFilesMutationVariables
  >(CREATE_FILES, {
    update(cache, { data }) {
      const brand = data?.organizationBrandFileCreateBatch?.brand

      if (brand) {
        cache.evict({ id: cache.identify({ ...brand }) })
        cache.gc()
      }
    },
  })

  const [deleteFiles] = useMutation<
    UseClosetBrandIndexPageDeleteFilesMutation,
    UseClosetBrandIndexPageDeleteFilesMutationVariables
  >(DELETE_FILES, {
    update(cache, { data }) {
      const brand = data?.organizationBrandFileDeleteBatch?.brand

      if (brand) {
        cache.evict({ id: cache.identify({ ...brand }) })
        cache.gc()
      }
    },
  })

  const handleCreateFiles = async (
    input: OrganizationBrandFileCreateBatchInput,
  ) => {
    const res = await createFiles({
      variables: {
        input,
      },
    })

    return res.data?.organizationBrandFileCreateBatch?.brand
  }

  const handleDeleteFiles = async (
    input: OrganizationBrandFileDeleteBatchInput,
  ) => {
    const res = await deleteFiles({
      variables: {
        input,
      },
    })

    return res.data?.organizationBrandFileDeleteBatch?.brand
  }

  return {
    handleCreateFiles,
    handleDeleteFiles,
  }
}

const CREATE_FILES = gql`
  mutation UseClosetBrandIndexPageCreateFilesMutation(
    $input: OrganizationBrandFileCreateBatchInput!
  ) {
    organizationBrandFileCreateBatch(input: $input) {
      brand {
        id
      }
    }
  }
`

const DELETE_FILES = gql`
  mutation UseClosetBrandIndexPageDeleteFilesMutation(
    $input: OrganizationBrandFileDeleteBatchInput!
  ) {
    organizationBrandFileDeleteBatch(input: $input) {
      brand {
        id
      }
    }
  }
`

export default useClosetBrandIndexPageFiles
