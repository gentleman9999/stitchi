import React from 'react'
import ApproveProofSlideOver from './ApproveProofSlideOver'
import { authorization } from '@lib/auth-rsc'
import { ScopeAction, ScopeResource } from '@generated/types'
import { SlideOverHeader } from '@components/ui/SlideOver'

interface Props {
  params: {
    proofId: string
  }
}

const Page = async ({ params: { proofId } }: Props) => {
  await authorization([
    {
      resource: ScopeResource.DesignRequest,
      action: ScopeAction.UPDATE,
    },
  ])

  return (
    <>
      <ApproveProofSlideOver designProofId={proofId} />
    </>
  )
}

export default Page
