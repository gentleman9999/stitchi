import { ClosetLayout } from '@components/layout'
import ClosetDesignShowPage from '@components/pages/ClosetDesignShowPage'
import { withAuthentication } from '@lib/auth'
import { useRouter } from 'next/router'
import React from 'react'

const Page = () => {
  const { query } = useRouter()

  const designId = typeof query.designId === 'string' ? query.designId : null

  let designProofId

  const { designTab } = query

  if (Array.isArray(designTab) && designTab[0] === 'proofs') {
    designProofId = designTab[1]
  }

  if (!designId) {
    return null
  }

  return (
    <ClosetDesignShowPage designId={designId} designProofId={designProofId} />
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return <ClosetLayout>{page}</ClosetLayout>
}

export default withAuthentication(Page)
