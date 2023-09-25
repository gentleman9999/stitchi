import { gql, useLazyQuery, useQuery } from '@apollo/client'
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
import {
  CreateDesignSlideOverGetDesignDataQuery,
  CreateDesignSlideOverGetDesignDataQueryVariables,
} from '@generated/CreateDesignSlideOverGetDesignDataQuery'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { GlobalDistribution, NeedleThread } from 'icons'
import { useLogger } from 'next-axiom'
import Link from 'next/link'
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
  const [approveDesign] = useCreateDesignSlideOver()

  const { data, loading } = useQuery<
    CreateDesignSlideOverGetDataQuery,
    CreateDesignSlideOverGetDataQueryVariables
  >(GET_DATA, {
    variables: { designProofId },
  })

  const [fetchDesignProduct, { data: designProductData }] = useLazyQuery<
    CreateDesignSlideOverGetDesignDataQuery,
    CreateDesignSlideOverGetDesignDataQueryVariables
  >(GET_DESIGN_DATA)

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
      logger.error('Invariant violation: design.id is null', {
        design: res?.design,
      })
      return
    }

    await fetchDesignProduct({
      variables: { designId },
    })
  }

  const { designProduct } = designProductData || {}

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
            {designProduct ? (
              <>
                <SlideOverHeader title="Your design is ready for production!" />

                <div className=" bg-gray-50 w-full max-h-[180px] h-full">
                  {designProduct?.primaryImageFile ? (
                    <img
                      src={designProduct.primaryImageFile.url}
                      width={designProduct.primaryImageFile.width}
                      height={designProduct.primaryImageFile.height}
                      className="w-full max-h-[180px] aspect-square object-contain"
                    />
                  ) : null}
                </div>

                <SlideOverContent>
                  <h2 className="text-2xl font-bold">{designProduct.name}</h2>
                  <p className="text-sm text-gray-600">
                    {designProduct.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-8">
                    <Link
                      className="p-4 flex gap-4 border border-gray-200 rounded-md hover:bg-gray-100 transition-all"
                      href={routes.internal.closet.inventory.show.products.show.buy.href(
                        { designId: designProduct.id },
                      )}
                    >
                      <NeedleThread className="w-16 h-16 shrink-0" />
                      <div>
                        <h2 className="font-bold">Place order</h2>
                        <p className="text-gray-600">
                          Now that your design is complete, it&apos;s time to
                          bring it to life! Place an order, and we&apos;ll start
                          the printing process immediately.
                        </p>
                      </div>
                    </Link>
                    <Link
                      className="p-4 flex gap-4 border border-gray-200 rounded-md hover:bg-gray-100 transition-all"
                      href={routes.internal.closet.inventory.show.products.show.href(
                        { designId: designProduct.id },
                      )}
                    >
                      <GlobalDistribution className="w-16 h-16 shrink-0" />
                      <div>
                        <h2 className="font-bold">Manage product</h2>
                        <p className="text-gray-600">
                          Manage your product and its inventory. Seamlessly
                          share it with your network or itegrate it with your
                          e-commerce platform.
                        </p>
                      </div>
                    </Link>
                  </div>
                </SlideOverContent>
              </>
            ) : (
              <>
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
              </>
            )}
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

const GET_DESIGN_DATA = gql`
  query CreateDesignSlideOverGetDesignDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      name
      description
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
