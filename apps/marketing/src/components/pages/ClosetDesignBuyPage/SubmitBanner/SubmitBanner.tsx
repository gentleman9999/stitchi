import LoadingDots from '@components/ui/LoadingDots'
import currency from 'currency.js'
import { ArrowRight } from 'icons'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import cx from 'classnames'

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
      <div className="text-base sm:text-lg font-medium text-center">
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
                <span className="text-lg mx-6 font-thin"> | </span>
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
        <button
          type="button"
          onClick={onSubmit}
          className={cx(
            'flex items-center text-lg font-bold group px-3 py-2 rounded-md bg-primary ',
            { 'text-red-500 !border-red-500 pointer-events-none': error },
          )}
          disabled={loading || submitting || error}
        >
          {error ? (
            'Please resolve errors'
          ) : (
            <>
              Add{submitting ? 'ing' : ''} to Cart{' '}
              <span className="ml-2 group-hover:translate-x-1 transition-all flex items-center">
                {submitting ? (
                  <LoadingDots />
                ) : (
                  <ArrowRight strokeWidth={2.5} width={16} />
                )}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default SubmitBanner
