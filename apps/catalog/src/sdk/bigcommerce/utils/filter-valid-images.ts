import { notEmpty } from '../../../utils/typescript'

interface Image {
  imageUrl: string
}

// To avoid BigCommerce rejecting an update to invalid image URLs, we filter out invalid images before updating the product
export default async function filterValidImages<T extends Image>(
  images: T[],
): Promise<T[]> {
  let validImages: T[] = []
  let invalidImages: T[] = []

  const imagePromises = images.map(async image => {
    const response = await fetch(image.imageUrl, { method: 'HEAD' }) // Use HEAD to avoid downloading the body

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Invalid image URL: ${image.imageUrl}`)
    }

    return image
  })

  const resolvedImages = await Promise.allSettled(imagePromises)

  for (const image of resolvedImages) {
    if (image.status === 'fulfilled' && image.value) {
      validImages.push(image.value)
    }
  }

  if (invalidImages.length > 0) {
    console.error(
      'Invalid images:',
      invalidImages.map(image => image.imageUrl).join(', '),
    )
  }

  return validImages
}
