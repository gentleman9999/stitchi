import { gql, useMutation } from '@apollo/client'
import {
  OrganizationBrandColorCreateInput,
  OrganizationBrandColorDeleteInput,
  OrganizationBrandColorUpdateInput,
} from '@generated/globalTypes'
import {
  UseClosetBrandIndexPageColorsCreateColorMutation,
  UseClosetBrandIndexPageColorsCreateColorMutationVariables,
} from '@generated/UseClosetBrandIndexPageColorsCreateColorMutation'
import {
  UseClosetBrandIndexPageColorsDeleteColorMutation,
  UseClosetBrandIndexPageColorsDeleteColorMutationVariables,
} from '@generated/UseClosetBrandIndexPageColorsDeleteColorMutation'
import {
  UseClosetBrandIndexPageColorsUpdateColorMutation,
  UseClosetBrandIndexPageColorsUpdateColorMutationVariables,
} from '@generated/UseClosetBrandIndexPageColorsUpdateColorMutation'

const useClosetBrandIndexPageColors = () => {
  const [createColor] = useMutation<
    UseClosetBrandIndexPageColorsCreateColorMutation,
    UseClosetBrandIndexPageColorsCreateColorMutationVariables
  >(CREATE_COLOR, {
    update(cache, { data }) {
      const brand = data?.organizationBrandColorCreate?.brand

      if (brand) {
        cache.evict({ id: cache.identify({ ...brand }) })
        cache.gc()
      }
    },
  })

  const [updateColor] = useMutation<
    UseClosetBrandIndexPageColorsUpdateColorMutation,
    UseClosetBrandIndexPageColorsUpdateColorMutationVariables
  >(UPDATE_COLOR, {
    update(cache, { data }) {
      const brand = data?.organizationBrandColorUpdate?.brand

      if (brand) {
        cache.evict({ id: cache.identify({ ...brand }) })
        cache.gc()
      }
    },
  })

  const [deleteColor] = useMutation<
    UseClosetBrandIndexPageColorsDeleteColorMutation,
    UseClosetBrandIndexPageColorsDeleteColorMutationVariables
  >(DELETE_COLOR, {
    update(cache, { data }) {
      const brand = data?.organizationBrandColorDelete?.brand

      if (brand) {
        cache.evict({ id: cache.identify({ ...brand }) })
        cache.gc()
      }
    },
  })

  const handleCreateColor = async (
    input: OrganizationBrandColorCreateInput,
  ) => {
    await createColor({
      variables: {
        input: {
          cmykC: input.cmykC,
          cmykK: input.cmykK,
          cmykM: input.cmykM,
          cmykY: input.cmykY,
          hex: input.hex,
          name: input.name,
          organizationId: input.organizationId,
          pantone: input.pantone,
        },
      },
    })
  }

  const handleUpdateColor = async (
    input: OrganizationBrandColorUpdateInput,
  ) => {
    await updateColor({
      variables: {
        input: {
          id: input.id,
          cmykC: input.cmykC,
          cmykK: input.cmykK,
          cmykM: input.cmykM,
          cmykY: input.cmykY,
          hex: input.hex,
          name: input.name,
          organizationId: input.organizationId,
          pantone: input.pantone,
        },
      },
    })
  }

  const handleDeleteColor = async (
    input: OrganizationBrandColorDeleteInput,
  ) => {
    await deleteColor({
      variables: {
        input: {
          colorId: input.colorId,
          organizationId: input.organizationId,
        },
      },
    })
  }

  return {
    handleCreateColor,
    handleUpdateColor,
    handleDeleteColor,
  }
}

const CREATE_COLOR = gql`
  mutation UseClosetBrandIndexPageColorsCreateColorMutation(
    $input: OrganizationBrandColorCreateInput!
  ) {
    organizationBrandColorCreate(input: $input) {
      brand {
        id
      }
    }
  }
`

const UPDATE_COLOR = gql`
  mutation UseClosetBrandIndexPageColorsUpdateColorMutation(
    $input: OrganizationBrandColorUpdateInput!
  ) {
    organizationBrandColorUpdate(input: $input) {
      brand {
        id
      }
    }
  }
`

const DELETE_COLOR = gql`
  mutation UseClosetBrandIndexPageColorsDeleteColorMutation(
    $input: OrganizationBrandColorDeleteInput!
  ) {
    organizationBrandColorDelete(input: $input) {
      brand {
        id
      }
    }
  }
`

export default useClosetBrandIndexPageColors
