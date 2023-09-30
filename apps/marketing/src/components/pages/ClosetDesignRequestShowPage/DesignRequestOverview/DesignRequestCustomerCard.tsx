import { gql, useQuery } from '@apollo/client'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import {
  DesignRequestCustomerCardGetDataQuery,
  DesignRequestCustomerCardGetDataQueryVariables,
} from '@generated/DesignRequestCustomerCardGetDataQuery'
import React from 'react'

interface Props {
  designRequestId: string
}

const DesignRequestCustomerCard = ({ designRequestId }: Props) => {
  const { data } = useQuery<
    DesignRequestCustomerCardGetDataQuery,
    DesignRequestCustomerCardGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle title="Client" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={data?.designRequest?.membership?.user?.picture || ''}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              {data?.designRequest?.membership?.user?.name}
            </p>
            <p className="text-gray-600">
              {data?.designRequest?.membership?.organization?.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const GET_DATA = gql`
  query DesignRequestCustomerCardGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      membership {
        id
        user {
          id
          name
          picture
        }
        organization {
          id
          name
        }
      }
    }
  }
`

export default DesignRequestCustomerCard
