import React from 'react'
import cx from 'classnames'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowRight } from 'icons'
import { CmsImage } from '@components/common'
import { gql } from '@apollo/client'
import { ImageFullScreenImageFragment } from '@generated/ImageFullScreenImageFragment'

interface Props {
  image: ImageFullScreenImageFragment
  open: boolean
  canNext: boolean
  canPrev: boolean
  onNext: () => void
  onPrev: () => void
  onOpenChange: () => void
}

const ImageFullScreen = ({
  image,
  open,
  canNext,
  canPrev,
  onNext,
  onPrev,
  onOpenChange,
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-800/70 fixed inset-0 z-50" />
        <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 w-full max-w-[90%] md:max-w-2xl max-h-[80vh] -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="relative">
            <div className="hidden md:block">
              <button
                className={cx(
                  'absolute -left-12 top-1/2 text-white border rounded-full transition-all',
                  { 'opacity-0': !canPrev },
                )}
                onClick={onPrev}
              >
                <ArrowLeft />
              </button>
              <button
                className={cx(
                  'absolute -right-12 top-1/2 text-white border rounded-full transition-all',
                  {
                    'opacity-0': !canNext,
                  },
                )}
                onClick={onNext}
              >
                <ArrowRight />
              </button>
            </div>

            <CmsImage
              data={image}
              layout="responsive"
              objectFit="contain"
              className="rounded-md overflow-hidden"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

ImageFullScreen.fragments = {
  image: gql`
    fragment ImageFullScreenImageFragment on ResponsiveImage {
      ...CmsImageFragment
    }
  `,
}

export default ImageFullScreen
