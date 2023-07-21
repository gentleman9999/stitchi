import getOrThrow from '@lib/utils/get-or-throw'
import Image, { ImageProps } from 'next/image'
import React from 'react'

const CLOUDINARY_CLOUD_NAME = getOrThrow(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  'CLOUDINARY_CLOUD_NAME',
)

const normalizeSrc = (src: string) => (src[0] === '/' ? src.slice(1) : src)

function cloudinaryLoader({
  src,
  width,
  quality,
  extraTransformations,
}: {
  src: string
  width: number
  quality?: number
  extraTransformations?: string[]
}) {
  const defaultParams = [
    'f_auto',
    'c_limit',
    'w_' + width,
    'q_' + (quality || 'auto'),
  ]
  const params = extraTransformations
    ? [...defaultParams, ...extraTransformations]
    : defaultParams

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(
    ',',
  )}/${normalizeSrc(src)}`
}

interface Props extends Omit<ImageProps, 'loader'> {}

const CloudinaryImage = (props: Props) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <Image loader={cloudinaryLoader} {...props} />
)

export default CloudinaryImage
