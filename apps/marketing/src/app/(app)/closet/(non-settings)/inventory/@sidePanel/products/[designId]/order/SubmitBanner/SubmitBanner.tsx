import LoadingDots from '@components/ui/LoadingDots'
import currency from 'currency.js'
import { ArrowRight } from 'icons'
import React from 'react'
import cx from 'classnames'
import Button from '@components/ui/ButtonV2/Button'
import Skeleton from '@components/ui/Skeleton'

interface Props {
  loading: boolean
  submitting: boolean
  unitPriceCents: number | null
  priceCents: number | null
  error: boolean
  onSubmit: () => void
}

const SubmitBanner = ({
  priceCents,
  unitPriceCents,
  loading,
  submitting,
  error,
  onSubmit,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full">
      <div className="text-base text-center text-gray-700">
        {loading ? (
          <div className="text-gray-400">
            ${' '}
            <Skeleton
              width={70}
              baseColor="rgb(120 113 108)"
              highlightColor="rgb(189 253 109)"
            />
          </div>
        ) : (
          <>
            {unitPriceCents !== null && priceCents !== null ? (
              <>
                {currency(unitPriceCents, { fromCents: true }).format()}{' '}
                <span className="text-xs">each</span>
                <span className="text-lg mx-2 font-thin"> | </span>
                {currency(priceCents, {
                  fromCents: true,
                }).format()}{' '}
                <span className="text-xs">total</span>
              </>
            ) : (
              'Select quantity to see price'
            )}
          </>
        )}
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-8 items-center">
        <Button
          bold
          type="button"
          onClick={onSubmit}
          loading={submitting}
          disabled={loading || error}
          endIcon={<ArrowRight strokeWidth={2.5} width={16} />}
          color="brandPrimary"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default SubmitBanner
