import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import React from 'react'
import TempInnerPage from './TempInnerPage'
import { authorization } from '@lib/auth-rsc'

const Page = async () => {
  await authorization([
    {
      action: ScopeAction.CREATE,
      resource: ScopeResource.DesignProof,
    },
  ])

  return <TempInnerPage />
}

export default Page
