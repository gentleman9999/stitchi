'use client'

import React from 'react'
import DesignRequestTitle from './DesignRequestTitle'
import Progress from './Progress'
import { gql, useSuspenseQuery } from '@apollo/client'

import { ComponentErrorMessage } from '@components/common'
import {
  DesignRequestShowPageMainHeaderPageGetDataQuery,
  DesignRequestShowPageMainHeaderPageGetDataQueryVariables,
} from '@generated/types'

import { DESIGN_REQUEST } from './DesignRequestTitle/DesignRequestTitle.fragments'
import { useParams } from 'next/navigation'

const Page = () => {
  const { designId } = useParams<{ designId: string }>()!

  const { data, error } = useSuspenseQuery<
    DesignRequestShowPageMainHeaderPageGetDataQuery,
    DesignRequestShowPageMainHeaderPageGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      designId,
    },
  })

  const { designRequest } = data

  if (!designRequest) {
    return <ComponentErrorMessage error={error || 'Design request not found'} />
  }

  return (
    <>
      <DesignRequestTitle designRequest={designRequest} />
      <div className="mt-4">
        <Progress status={designRequest.status} />
      </div>
    </>
  )
}

const GET_DATA = gql`
  ${DESIGN_REQUEST}
  query DesignRequestShowPageMainHeaderPageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      status
      ...DesignRequestTitleDesignRequesetFragment
    }
  }
`

export default Page
