import { gql, useQuery } from '@apollo/client'
import Alert from '@components/ui/Alert'
import Button from '@components/ui/ButtonV2/Button'
import {
  SlideOverHeader,
  SlideOver,
  SlideOverContent,
  SlideOverActions,
} from '@components/ui/SlideOver'
import { CreateDesignSlideOverDesignRequestFragment } from '@generated/CreateDesignSlideOverDesignRequestFragment'
import {
  CreateDesignSlideOverGetDataQuery,
  CreateDesignSlideOverGetDataQueryVariables,
} from '@generated/CreateDesignSlideOverGetDataQuery'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { useLogger } from 'next-axiom'
import { useRouter } from 'next/router'
import React from 'react'
import CreateDesignForm, { FormValues } from './CreateDesignForm'
import useCreateDesignSlideOver from './useCreateDesignSlideOver'

interface Props {
  designRequest: CreateDesignSlideOverDesignRequestFragment
  designProofId?: string | null
  onClose: () => void
}

const CreateDesignSlideOver = (props: Props) => {
  if (!props.designProofId) return null

  return (
    <Inner
      designProofId={props.designProofId}
      onClose={props.onClose}
      designRequest={props.designRequest}
    />
  )
}

const Inner = ({
  designProofId,
  onClose,
  designRequest,
}: {
  designProofId: string
  designRequest: CreateDesignSlideOverDesignRequestFragment
  onClose: () => void
}) => {
  const logger = useLogger()
  const router = useRouter()
  const [approveDesign] = useCreateDesignSlideOver()

  const { data, loading } = useQuery<
    CreateDesignSlideOverGetDataQuery,
    CreateDesignSlideOverGetDataQueryVariables
  >(GET_DATA, {
    variables: { designProofId },
  })

  const { designProof } = data || {}

  const handleCreateDesign = async (input: FormValues) => {
    const res = await approveDesign({
      designProofId,
      designRequestId: designRequest.id,
      name: input.name,
      description: input.description,
      termsConditionsAgreed: input.termsConditionsAgreed,
    })

    const designId = res?.design?.id

    if (!designId) {
      logger.error('Invariant violation: design.id is null', { design: res?.design })
      return
    }

    await router.push(
      routes.internal.closet.inventory.show.products.show.href({ designId }),
    )
  }

  return (
    <CreateDesignForm
      onSubmit={handleCreateDesign}
      initialValues={{
        name: designRequest.name,
      }}
      renderContainer={({ children, loading: submitLoading, onSubmit }) => (
        <>
          <SlideOver
            open
            className="sm:w-full sm:max-w-xl"
            onOpenChange={() => onClose()}
          >
            <SlideOverHeader title="Approve design and create product" />
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
                loading={loading || submitLoading}
                onClick={onSubmit}
                endIcon={<ArrowRightIcon className="w-4" />}
              >
                Continue
              </Button>
            </SlideOverActions>
          </SlideOver>
        </>
      )}
    />
  )
}

const GET_DATA = gql`
  query CreateDesignSlideOverGetDataQuery($designProofId: ID!) {
    designProof(id: $designProofId) {
      id
      primaryImageFile {
        id
        url
        width
        height
      }
    }
  }
`

CreateDesignSlideOver.fragments = {
  designRequest: gql`
    fragment CreateDesignSlideOverDesignRequestFragment on DesignRequest {
      id
      name
    }
  `,
}

export default CreateDesignSlideOver
