import { gql } from '@apollo/client'

export const GET_DATA = gql`
  query UseAuthorizedComponentGetDataQuery {
    viewer {
      id
      role
      scopes {
        resource
        action
      }
    }
  }
`
