import { gql } from '@apollo/client'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import { Container } from '@components/ui'
import { ClosetDesignProofCreatePageDesignRequestFragment } from '@generated/ClosetDesignProofCreatePageDesignRequestFragment'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'
import CreateProofForm, { FormValues } from './CreateProofForm'
import useCreateProof from './useCreateProof'

interface Props {
  designRequest: ClosetDesignProofCreatePageDesignRequestFragment
}

const ClosetDesignProofCreatePage = ({ designRequest }: Props) => {
  const router = useRouter()
  const [createProof] = useCreateProof()

  const handleCreateProof = async (data: FormValues) => {
    try {
      await createProof({
        designRequestId: designRequest.id,
        note: data.note,
        fileIds: data.fileIds,
        proofLocations: data.proofLocations.map(location => ({
          colorCount: location.colorCount,
          fileId: location.fileId,
          placement: location.placement,
        })),
      })
    } catch (error) {
      console.error(error)

      return
    }

    await router.push(
      routes.internal.closet.designs.show.activity.href({
        designId: designRequest.id,
      }),
    )
  }

  return (
    <Container>
      <ClosetPageHeader>
        <ClosetPageTitle title="Create Proof" />
      </ClosetPageHeader>
      <CreateProofForm
        onSubmit={handleCreateProof}
        uploadFolder={designRequest.fileUploadDirectory}
      />
    </Container>
  )
}

ClosetDesignProofCreatePage.fragments = {
  designRequest: gql`
    fragment ClosetDesignProofCreatePageDesignRequestFragment on DesignRequest {
      id
      fileUploadDirectory
    }
  `,
}

export default ClosetDesignProofCreatePage
