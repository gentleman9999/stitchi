'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import AppTopbarUser from '@components/layout/AppTopbar/AppTopbarUser'
import {
  AppLayoutGetDataQuery,
  AppLayoutGetDataQueryVariables,
} from '@generated/types'
import React from 'react'

interface Props {}

const TopbarUser = (props: Props) => {
  const { data } = useSuspenseQuery<
    AppLayoutGetDataQuery,
    AppLayoutGetDataQueryVariables
  >(GET_DATA)

  return <AppTopbarUser membership={data.viewer} />
}

const GET_DATA = gql`
  ${AppTopbarUser.fragments.membership}
  query AppLayoutGetDataQuery {
    viewer {
      id
      ...AppTopbarUserMembershipFragment
    }
  }
`

export default TopbarUser
