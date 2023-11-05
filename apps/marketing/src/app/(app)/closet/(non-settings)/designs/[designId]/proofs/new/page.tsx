import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import React from 'react'
import TempInnerPage from './TempInnerPage'
import { authorization } from '@lib/auth-rsc'

const Page = async ({
  params: { designId },
}: {
  params: { designId: string }
}) => {
  await authorization([
    {
      action: ScopeAction.CREATE,
      resource: ScopeResource.DesignProof,
    },
  ])

  return <TempInnerPage designId={designId} />
}

export default Page
