import React from 'react'

interface Props {}

const DesignPageArtExamples = ({}: Props) => {
  return (
    <div className="flex items-center space-x-6 lg:space-x-8 justify-between">
      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg" />
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" />
      </div>
      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" />
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" />
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" />
      </div>
      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" />
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg" />
      </div>

      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" />
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" />
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" />
      </div>
      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" />
        <Image src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg" />
      </div>
    </div>
  )
}

const Image = ({ src, alt = '' }: { src: string; alt?: string }) => {
  return (
    <div className="w-44 h-64 rounded-lg overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-center object-cover"
      />
    </div>
  )
}

export default DesignPageArtExamples
