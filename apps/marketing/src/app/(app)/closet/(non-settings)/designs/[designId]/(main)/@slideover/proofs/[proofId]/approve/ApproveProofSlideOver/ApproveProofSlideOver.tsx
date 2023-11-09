'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import Alert from '@components/ui/Alert'
import Button from '@components/ui/ButtonV2/Button'
import {
  SlideOverHeader,
  SlideOverContent,
  SlideOverActions,
} from '@components/ui/SlideOver'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import React from 'react'
import CreateDesignForm, { FormValues } from './ApproveProofForm'
import useApproveProofSlideOver from './useApproveProofSlideOver'
import { useRouter } from 'next/navigation'
import {
  ApproveProofSlideOverGetDataQuery,
  ApproveProofSlideOverGetDataQueryVariables,
} from '@generated/types'

const ApproveProofSlideOver = ({
  designProofId,
}: {
  designProofId: string
}) => {
  const router = useRouter()
  const [approveDesign] = useApproveProofSlideOver()

  const { data } = useSuspenseQuery<
    ApproveProofSlideOverGetDataQuery,
    ApproveProofSlideOverGetDataQueryVariables
  >(GET_DATA, {
    variables: { designProofId },
  })

  const { designProof } = data || {}

  const { designRequestId } = designProof || {}

  if (designProof && !designRequestId) {
    console.error(
      "Design proof doesn't have a designRequestId. This should not happen.",
      {
        context: { designProof },
      },
    )

    throw new Error(
      "Design proof doesn't have a designRequestId. This should not happen.",
    )
  }

  const handleCreateDesign = async (input: FormValues) => {
    if (!designProof || !designRequestId) {
      return null
    }

    await approveDesign({
      designProofId,
      designRequestId,
      name: input.name,
      description: input.description,
      termsConditionsAgreed: input.termsConditionsAgreed,
    })

    router.push(
      routes.internal.closet.designs.show.approved.href({
        designRequestId,
      }),
    )
  }

  if (!designProof?.designRequest) {
    return null
  }

  return (
    <CreateDesignForm
      onSubmit={handleCreateDesign}
      initialValues={{
        name: designProof.designRequest.name,
      }}
      renderContainer={({ children, loading: submitLoading, onSubmit }) => (
        <>
          <div>
            <div className=" bg-gray-50 w-full max-h-[180px] h-full">
              {designProof?.primaryImageFile ? (
                <img
                  src={designProof.primaryImageFile.url}
                  width={designProof.primaryImageFile.width}
                  height={designProof.primaryImageFile.height}
                  className="w-full max-h-[180px] aspect-square object-contain"
                />
              ) : null}
            </div>
          </div>

          <SlideOverContent>
            <Alert
              description="We're thrilled to have hit the mark with this design! By
                turning this design into a product, you'll gain the ability to place an order,
                share with your network, and seamlessly list on your
                favorite e-commerce platform."
            />

            <br />

            {children}
          </SlideOverContent>
          <SlideOverActions>
            <Button
              size="xl"
              color="brandPrimary"
              loading={submitLoading}
              onClick={onSubmit}
              endIcon={<ArrowRightIcon className="w-4" />}
            >
              Continue
            </Button>
          </SlideOverActions>
        </>
      )}
    />
  )
}

const GET_DATA = gql`
  query ApproveProofSlideOverGetDataQuery($designProofId: ID!) {
    designProof(id: $designProofId) {
      id
      designRequestId
      primaryImageFile {
        id
        url
        width
        height
      }
      designRequest {
        id
        name
      }
    }
  }
`

export default ApproveProofSlideOver
