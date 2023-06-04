import { Container, LoadingDots } from '@components/ui'
import currency from 'currency.js'
import { ArrowRight } from 'icons'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import cx from 'classnames'

interface Props {
  loading: boolean
  submitting: boolean
  priceCents: number | null
  error: boolean
}

const SubmitBanner = ({ priceCents, loading, submitting, error }: Props) => {
  return (
    <>
      {/* Used to create spacing for the fixed-positioned banner */}
      <div className="h-16" />
      <div className="fixed bottom-0 left-0 right-0 py-4 bg-primary/95 text-black z-40">
        <Container>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-medium">
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
                  {priceCents !== null ? (
                    <>
                      {currency(priceCents, { fromCents: true }).format()}{' '}
                      <span className="text-xs">total</span>
                    </>
                  ) : (
                    'Make selections to see price'
                  )}
                </>
              )}
            </div>
            <button
              type="submit"
              className={cx(
                'flex items-center text-lg font-bold group border-2 px-2 py-1 rounded-md border-gray-900',
                { 'text-red-500 !border-red-500 pointer-events-none': error },
              )}
              disabled={loading || submitting || error}
            >
              Add{submitting ? 'ing' : ''} to Cart{' '}
              <span className="ml-2 group-hover:translate-x-1 transition-all flex items-center">
                {submitting ? (
                  <LoadingDots />
                ) : (
                  <ArrowRight strokeWidth={2.5} width={16} />
                )}
              </span>
            </button>
          </div>
        </Container>
      </div>
    </>
  )
}

export default SubmitBanner
