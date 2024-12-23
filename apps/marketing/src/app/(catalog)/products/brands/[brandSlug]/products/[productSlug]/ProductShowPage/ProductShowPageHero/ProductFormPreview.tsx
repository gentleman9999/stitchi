import ColorSwatch from '@components/common/ColorSwatch'
import Button from '@components/ui/ButtonV2/Button'
import LinkInline from '@components/ui/LinkInline'
import {
  PaintBrushIcon,
  CheckIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { track } from '@lib/analytics'
import routes from '@lib/routes'
import currency from 'currency.js'
import { usePathname } from 'next/navigation'
import React from 'react'

interface ProductColor {
  id: string
  catalogProductColorId: string
  hex: string | null
  name: string | null
}

interface Props {
  colors: ProductColor[]
  minPrice: number
  sizeRange: string
  activeColorId: string | null
  onSelectColor: (color: ProductColor) => void
}

const ProductFormPreview = ({
  colors,
  minPrice,
  sizeRange,
  activeColorId,
  onSelectColor,
}: Props) => {
  const pathname = usePathname()!

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <ul className="flex flex-wrap gap-1 py-1">
            {colors.map(color => (
              <li key={color.catalogProductColorId}>
                <ColorSwatch
                  onClick={() => {
                    onSelectColor(color)
                  }}
                  hexCode={color.hex || '#000'}
                  label={color.name}
                  width="w-6"
                  height="h-6"
                  selected={color.catalogProductColorId === activeColorId}
                />
              </li>
            ))}
          </ul>

          {sizeRange.toLowerCase() !== 'one size' ? (
            <span className="text-base font-medium">
              Available sizes: {sizeRange}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-sm flex flex-col gap-4 ">
            <div>
              <h2 className="font-headingDisplay font-semibold text-2xl sm:text-3xl text-gray-800">
                From {currency(minPrice).format()}
              </h2>
              <p className="text-gray-500 text-sm">
                Price varies based on print areas, ink colors, and quantity
                ordered.
              </p>
            </div>

            <h3 className="font-medium text-xl">
              Login to customize and get instant quote
            </h3>
            <Button
              Component="a"
              href={routes.internal.signup.href({
                redirectTo: pathname,
              })}
              size="2xl"
              color="brandPrimary"
              onClick={() => {
                track.signupCtaClicked({
                  locationHref: window.location.href,
                  ctaType: 'product',
                })
              }}
            >
              Create free account
            </Button>

            <p className="text-gray-700">
              Have an account already?{' '}
              <LinkInline href={routes.internal.login.href()} external>
                Login
              </LinkInline>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col gap-4">
        <Feature
          title="Order risk-free"
          description="Cancel before proof approval - no fees, no fuss. Order with confidence!"
          icon={<CheckIcon className="w-6 h-6" />}
        />

        <Feature
          title="Create truly unique pieces"
          description="Take customization to the next level by tailor-making products that match your brand. All items are as unique as your brand — nothing exists twice!"
          icon={<PaintBrushIcon className="w-6 h-6" />}
        />

        <Feature
          title="Send anywhere, or store with us"
          description="Global shipping or on-demand fulfillment from our warehouse. Convenience redefined!"
          icon={<PaperAirplaneIcon className="w-6 h-6" />}
        />
      </div> */}
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) => {
  return (
    <div className=" bg-gray-100 rounded-sm p-4 flex flex-row gap-4 items-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
        {icon}
      </div>
      <div className="flex flex-col ">
        <h3 className="text-gray-800 font-semibold text-base">{title}</h3>

        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default ProductFormPreview
