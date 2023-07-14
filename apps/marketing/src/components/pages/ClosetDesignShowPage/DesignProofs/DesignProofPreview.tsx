import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { gql, useQuery } from '@apollo/client'
import {
  DesignProofPreviewGetDataQuery,
  DesignProofPreviewGetDataQueryVariables,
  DesignProofPreviewGetDataQuery_designProof_primaryImageFile,
} from '@generated/DesignProofPreviewGetDataQuery'
import Skeleton from 'react-loading-skeleton'
import { LoadingDots } from '@components/ui'
import { useRouter } from 'next/router'
import routes from '@lib/routes'
import { format, parseISO } from 'date-fns'
import UserBadge from '@components/common/UserBadge'

interface Props {
  designRequestId: string
  designProofId: string
}

const DesignProofPreview = ({ designRequestId, designProofId }: Props) => {
  const router = useRouter()
  const { data, loading } = useQuery<
    DesignProofPreviewGetDataQuery,
    DesignProofPreviewGetDataQueryVariables
  >(GET_DATA, { variables: { designProofId } })

  const { designProof } = data || {}

  const { artist, primaryImageFile } = designProof || {}

  return (
    <Dialog.Root
      open
      onOpenChange={() => {
        router.push(
          routes.internal.closet.designRequests.show.proofs.href({
            designId: designRequestId,
          }),
        )
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-800/70 fixed inset-0 z-50" />
        <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 w-full max-w-[95%] xl:max-w-7xl max-h-[95vh] h-full -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden">
          <div className="grid grid-cols-12 h-full divide-x">
            <div className="col-span-12 md:col-span-7">
              <Gallery
                images={primaryImageFile ? [primaryImageFile] : []}
                loading={loading}
              />
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="p-6">
                <p className="">
                  <span>
                    <UserBadge />
                  </span>
                  {designProof ? (
                    format(parseISO(designProof.createdAt), 'PPPp')
                  ) : (
                    <Skeleton />
                  )}
                </p>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Gallery = ({
  loading,
  images,
}: {
  loading: boolean
  images: DesignProofPreviewGetDataQuery_designProof_primaryImageFile[]
}) => {
  const [activeImage, setActiveImage] = React.useState(images[0])

  React.useEffect(() => {
    if (!loading && !activeImage) {
      setActiveImage(images[0])
    }
  }, [activeImage, images, loading])

  return (
    <div className="flex flex-col h-full divide-y">
      <div className="flex flex-col items-center justify-center flex-1">
        {loading ? (
          <LoadingDots />
        ) : (
          <>
            {activeImage ? (
              <img
                className="aspect-square object-contain"
                src={activeImage.url}
                width={activeImage.width}
                height={activeImage.height}
              />
            ) : null}
          </>
        )}
      </div>

      <div className="flex h-40 bg-gray-50 p-2 gap-2 overflow-x-scroll">
        {loading ? (
          <>
            {Array.from(new Array(4).map((_, i) => i)).map(i => (
              <Skeleton key={i} className="h-full aspect-square" />
            ))}
          </>
        ) : (
          <>
            {images.map(image => (
              <button
                key={image.id}
                onClick={() => setActiveImage(image)}
                className="aspect-square object-contain h-full rounded-md"
              >
                <img
                  className="aspect-square object-contain"
                  src={image.url}
                  width={image.width}
                  height={image.height}
                />
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

const GET_DATA = gql`
  query DesignProofPreviewGetDataQuery($designProofId: ID!) {
    designProof(id: $designProofId) {
      id
      createdAt
      artist {
        id
        name
        picture
      }
      primaryImageFile {
        id
        url
        width
        height
      }
    }
  }
`

export default DesignProofPreview
