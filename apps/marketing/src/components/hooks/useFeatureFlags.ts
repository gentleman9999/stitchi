import { gql, useQuery } from '@apollo/client'
import { UseFeatureFlagsGetDataQuery } from '@generated/UseFeatureFlagsGetDataQuery'

const useFeatureFlags = () => {
  const { data, loading } = useQuery<UseFeatureFlagsGetDataQuery>(GET_DATA)

  return [
    {
      isBetaTester: data?.viewer?.flags?.isBetaTester ?? false,
    },
    { loading },
  ] as const
}

const GET_DATA = gql`
  query UseFeatureFlagsGetDataQuery {
    viewer {
      id
      flags {
        isBetaTester
      }
    }
  }
`

export default useFeatureFlags
