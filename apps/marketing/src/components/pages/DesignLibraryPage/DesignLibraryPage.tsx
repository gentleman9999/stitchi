import { gql, useQuery } from '@apollo/client'
import { CmsImage } from '@components/common'
import { Container } from '@components/ui'
import {
  DesignLibraryPageGetDataQuery,
  DesignLibraryPageGetDataQueryVariables,
  DesignLibraryPageGetDataQuery_allDesigns_primaryImage_responsiveImage as ResponsiveImage,
} from '@generated/DesignLibraryPageGetDataQuery'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowRight, Expand } from 'icons'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'

const PAGE_SIZE = 20

interface Props {}

const DesignLibraryPage = (props: Props) => {
  const [activeImageId, setActiveImageId] = useQueryState(
    'image',
    queryTypes.string,
  )

  const { data, fetchMore, variables } = useQuery<
    DesignLibraryPageGetDataQuery,
    DesignLibraryPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: PAGE_SIZE,
      skip: 0,
    },
  })

  const handleFetchMore = () => {
    fetchMore({ variables: { skip: (variables?.skip || 0) + PAGE_SIZE } })
  }

  const { nextImage, currentImage, prevImage } =
    data?.allDesigns.reduce<{
      nextImage: (typeof data.allDesigns)[number] | null
      prevImage: (typeof data.allDesigns)[number] | null
      currentImage?: (typeof data.allDesigns)[number] | null
    }>(
      (acc, design, index, arr) => {
        if (design.id === activeImageId) {
          acc.currentImage = design
          acc.nextImage = arr[index + 1]
          acc.prevImage = arr[index - 1]
        }
        return acc
      },
      { nextImage: null, currentImage: null, prevImage: null },
    ) || {}

  return (
    <Container>
      {currentImage?.primaryImage?.responsiveImage ? (
        <Dialog.Root open onOpenChange={() => setActiveImageId(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-gray-800/70 fixed inset-0 z-50" />
            <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 w-full max-w-[90%] md:max-w-2xl max-h-[80vh] -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="relative">
                <div className="hidden md:block">
                  <button
                    className="absolute -left-12 top-1/2 text-white border rounded-full"
                    onClick={() => setActiveImageId(prevImage?.id)}
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    className="absolute -right-12 top-1/2 text-white border rounded-full"
                    onClick={() => setActiveImageId(nextImage?.id)}
                  >
                    <ArrowRight />
                  </button>
                </div>

                <CmsImage
                  data={currentImage.primaryImage.responsiveImage}
                  layout="responsive"
                  objectFit="contain"
                  className="rounded-md overflow-hidden"
                />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:-gap-4 lg:gap-6">
        {data?.allDesigns.map(design => {
          const image = design.primaryImage?.responsiveImage
          if (!image) {
            return null
          }

          return (
            <li key={image.src}>
              <button
                className="relative"
                onClick={() => setActiveImageId(design.id)}
              >
                <div className="absolute z-10 inset-0 rounded-md hover:bg-gradient-to-b from-transparent from-65% to-gray-700/50 opacity-0 hover:opacity-100 transition-all group">
                  <Expand
                    width={20}
                    height={20}
                    className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-all stroke-white"
                  />
                </div>
                <div className="rounded-md overflow-hidden">
                  <CmsImage data={image} />
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

const GET_DATA = gql`
  ${CmsImage.fragments.image}
  query DesignLibraryPageGetDataQuery($first: IntType, $skip: IntType) {
    allDesigns(first: $first, skip: $skip) {
      id
      primaryImage {
        id
        responsiveImage {
          ...CmsImageFragment
        }
      }
    }
  }
`

export default DesignLibraryPage
