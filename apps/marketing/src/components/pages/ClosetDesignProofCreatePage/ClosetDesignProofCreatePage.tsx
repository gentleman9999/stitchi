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
    const serializedProofVariants = data.proofVariants.map(variant => {
      const designRequestVariant =
        designRequest.designRequestProduct.colors.find(
          v => v.catalogProductColorId === variant.catalogProductColorId,
        )

      return {
        catalogProductColorId: variant.catalogProductColorId,
        imageFileIds: variant.imageFileIds,
        name: designRequestVariant?.name || '',
        hexCode: designRequestVariant?.hexCode || '',
      }
    })

    try {
      await createProof({
        designRequestId: designRequest.id,
        primaryImageFileId: data.primaryImageFileId,
        message: data.message,
        proofLocations: data.proofLocations.map(location => ({
          colorCount: location.colorCount,
          fileId: location.fileId,
          placement: location.placement,
        })),
        proofVariants: serializedProofVariants.map(variant => ({
          catalogProductColorId: variant.catalogProductColorId,
          imageFileIds: variant.imageFileIds,
          name: variant.name,
          hexCode: variant.hexCode,
        })),
      })
    } catch (error) {
      console.error(error)

      return
    }

    await router.push(
      routes.internal.closet.designRequests.show.activity.href({
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
        designRequest={designRequest}
      />
    </Container>
  )
}

ClosetDesignProofCreatePage.fragments = {
  designRequest: gql`
    ${CreateProofForm.fragments.designRequest}
    fragment ClosetDesignProofCreatePageDesignRequestFragment on DesignRequest {
      id
      fileUploadDirectory
      ...CreateProofFormDesignRequestFragment
    }
  `,
}

export default ClosetDesignProofCreatePage