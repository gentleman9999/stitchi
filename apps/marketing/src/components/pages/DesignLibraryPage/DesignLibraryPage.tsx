import { gql, useQuery } from '@apollo/client'
import { CmsImage, InfiniteScrollContainer, Section } from '@components/common'
import { Button, Container } from '@components/ui'
import {
  DesignLibraryPageGetDataQuery,
  DesignLibraryPageGetDataQueryVariables,
} from '@generated/DesignLibraryPageGetDataQuery'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import { ArrowRight, Customization, Expand } from 'icons'
import { NextSeo } from 'next-seo'
import { queryTypes, useQueryState } from 'next-usequerystate'
import Link from 'next/link'
import React from 'react'
import ImageFullScreen from './ImageFullSreen'

const PAGE_SIZE = 20

interface Props {}

const DesignLibraryPage = (props: Props) => {
  const url = makeAbsoluteUrl(routes.internal.lookbook.href())

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
    <>
      <NextSeo
        title="Browse custom merch design inspiration"
        description="Get inspired by our library of custom shirt designs or work directly with a designer to bring your vision to life (for free)."
        canonical={url}
        openGraph={{ url }}
      />
      <Container>
        <Section>
          <div className="md:pr-0 mt-2 text-center sm:text-left  rounded-xl flex items-center">
            <div className="md:w-[70%]">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                Inspirational custom shirt designs
              </h1>
              <p className="text text-gray-700 mt-2">
                Spark your imagination with our library of custom shirt designs
                or work directly with a designer to bring your vision to life
                (for free).
              </p>
              <div className="mt-6">
                <Button
                  slim
                  Component={Link}
                  href={routes.internal.getStarted.href()}
                  variant="naked"
                  endIcon={<ArrowRight />}
                >
                  Work with a designer
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </Container>

      <section className="mt-10">
        <Container>
          {currentImage?.primaryImage?.responsiveImage ? (
            <ImageFullScreen
              open
              image={currentImage.primaryImage.responsiveImage}
              canNext={Boolean(nextImage)}
              canPrev={Boolean(prevImage)}
              onNext={() => setActiveImageId(nextImage?.id)}
              onPrev={() => setActiveImageId(prevImage?.id)}
              onOpenChange={() => setActiveImageId(null)}
            />
          ) : null}

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:-gap-4 lg:gap-6">
            {data?.allDesigns.map((design, index) => {
              if (index === 8) {
                return (
                  <li key="cta" className="col-span-2 ">
                    <Link
                      href={routes.internal.features.design.href()}
                      className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-md py-10 px-10 drop-shadow-md group"
                    >
                      <Customization className="w-12 h-12 text-primary" />
                      <span className="mt-2 text-sm font-semibold text-gray-700 group-hover:underline">
                        Learn about the design process.
                      </span>
                      <span className="text-xs text-gray-600 text-center mt-1">
                        Work directly with a designer <u>for free</u> when
                        choose Stitchi as your merch partner.
                      </span>
                    </Link>
                  </li>
                )
              }

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
          <InfiniteScrollContainer onIntersect={handleFetchMore} />
        </Container>
      </section>
    </>
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