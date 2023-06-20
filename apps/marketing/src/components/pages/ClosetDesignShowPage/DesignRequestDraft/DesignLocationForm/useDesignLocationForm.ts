import { gql, useMutation } from '@apollo/client'
import {
  DesignRequestDesignLocationCreateInput,
  DesignRequestDesignLocationUpdateInput,
} from '@generated/globalTypes'
import {
  UseDesignLocationFormCreateLocationMutation,
  UseDesignLocationFormCreateLocationMutationVariables,
} from '@generated/UseDesignLocationFormCreateLocationMutation'
import {
  UseDesignLocationFormUpdateLocationMutation,
  UseDesignLocationFormUpdateLocationMutationVariables,
} from '@generated/UseDesignLocationFormUpdateLocationMutatoin'
import { useState } from 'react'

type CreateLocationInput = Omit<
  DesignRequestDesignLocationCreateInput,
  'designRequestId'
>
type UpdateLocationInput = Omit<
  DesignRequestDesignLocationUpdateInput,
  'designRequestId'
>

interface Props {
  designRequestId: string
}

const useDesignLocationForm = ({ designRequestId }: Props) => {
  const [loading, setLoading] = useState(false)
  const [createLocation] = useMutation<
    UseDesignLocationFormCreateLocationMutation,
    UseDesignLocationFormCreateLocationMutationVariables
  >(CREATE_LOCATION, {
    update(cache, { data }) {
      const designRequest =
        data?.designRequestDesignLocationCreate?.designRequest
      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const [updateLocation] = useMutation<
    UseDesignLocationFormUpdateLocationMutation,
    UseDesignLocationFormUpdateLocationMutationVariables
  >(UPDATE_LOCATION, {
    update(cache, { data }) {
      const designRequest =
        data?.designRequestDesignLocationUpdate?.designRequest
      if (designRequest) {
        cache.evict({ id: cache.identify({ ...designRequest }) })
        cache.gc()
      }
    },
  })

  const handleCreateLocation = async (input: CreateLocationInput) => {
    const { data } = await createLocation({
      variables: {
        input: {
          ...input,
          designRequestId,
        },
      },
    })

    return data?.designRequestDesignLocationCreate?.designRequest
  }

  const handleUpdateLocation = async (input: UpdateLocationInput) => {
    const { data } = await updateLocation({
      variables: {
        input: {
          ...input,
          designRequestId,
        },
      },
    })

    return data?.designRequestDesignLocationUpdate?.designRequest
  }

  const handleLocationChange = async (
    input: CreateLocationInput | UpdateLocationInput,
  ) => {
    let response
    setLoading(true)

    try {
      if (
        'designRequestDesignLocationId' in input &&
        input.designRequestDesignLocationId.length
      ) {
        response = await handleUpdateLocation(input)
      } else {
        response = await handleCreateLocation({
          fileIds: input.fileIds,
          placement: input.placement || '',
          description: input.description,
        })
      }
    } finally {
      setLoading(false)
    }

    return response
  }

  return { handleLocationChange, loading }
}

const CREATE_LOCATION = gql`
  mutation UseDesignLocationFormCreateLocationMutation(
    $input: DesignRequestDesignLocationCreateInput!
  ) {
    designRequestDesignLocationCreate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

const UPDATE_LOCATION = gql`
  mutation UseDesignLocationFormUpdateLocationMutation(
    $input: DesignRequestDesignLocationUpdateInput!
  ) {
    designRequestDesignLocationUpdate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useDesignLocationForm
