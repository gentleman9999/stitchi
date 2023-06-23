import { gql, useQuery } from '@apollo/client'
import { UserOrganizationIndexPageGetDataQuery } from '@generated/UserOrganizationIndexPageGetDataQuery'
import React from 'react'

interface Props {}

const UserOrganizationsIndexPage = ({}: Props) => {
  const { data } = useQuery<UserOrganizationIndexPageGetDataQuery>(GET_DATA)

  return null
}

const GET_DATA = gql`
  query UserOrganizationIndexPageGetDataQuery {
    viewer {
      id
      user {
        organizations {
          id
          name
        }
      }
    }
  }
`

export default UserOrganizationsIndexPage
