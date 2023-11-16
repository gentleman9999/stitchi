import { gql, useMutation } from '@apollo/client'

interface Props {
  designRequestId: string
}

const useUpdateName = ({ designRequestId }: Props) => {
  const [updateName] = useMutation(UPDATE_NAME)

  const handleUpdate = async (name: string) => {
    await updateName({
      variables: {
        input: {
          designRequestId,
          name,
        },
      },
    })
  }

  return [handleUpdate] as const
}

const UPDATE_NAME = gql`
  mutation UseUpdateNameUpdateNameMutation($input: DesignRequestUpdateInput!) {
    designRequestUpdate(input: $input) {
      designRequest {
        id
      }
    }
  }
`

export default useUpdateName
