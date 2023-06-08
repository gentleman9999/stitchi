import { gql, useQuery } from '@apollo/client'
import { Container } from '@components/ui'
import { ClosetOrdersIndexPageGetDataQuery } from '@generated/ClosetOrdersIndexPageGetDataQuery'
import React from 'react'

interface Props {}

const ClosetOrdersIndexPage = (props: Props) => {
  const { data } = useQuery<ClosetOrdersIndexPageGetDataQuery>(GET_DATA)

  return (
    <>
      <Container>
        <h1>Your orders</h1>
      </Container>
    </>
  )
}

const GET_DATA = gql`
  query ClosetOrdersIndexPageGetDataQuery {
    viewer {
      id
    }
  }
`

export default ClosetOrdersIndexPage
