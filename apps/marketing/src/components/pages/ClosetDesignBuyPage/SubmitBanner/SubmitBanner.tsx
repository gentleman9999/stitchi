import { Button, Container, LoadingDots } from '@components/ui'
import currency from 'currency.js'
import { ArrowRight } from 'icons'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import cx from 'classnames'
import Link from 'next/link'
import routes from '@lib/routes'

interface Props {
  loading: boolean
  submitting: boolean
  unitPriceCents: number | null
  priceCents: number | null
  error: boolean
}

const SubmitBanner = ({
  priceCents,
  unitPriceCents,
  loading,
  submitting,
  error,
}: Props) => {
  return (
    <>
      {/* Used to create spacing for the fixed-positioned banner */}
      <div className="h-16" />
      <div className="fixed bottom-0 left-0 right-0 py-2 sm:py-4 bg-primary/95 text-black z-40 border-t-2 border-black">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-xl sm:text-2xl font-medium text-center">
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
                    'Make selections to see price'
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-8 items-center">
              <Button
                Component={Link}
                href={routes.internal.getStarted.href()}
                variant="naked"
                className="!text-sm sm:!text-lg"
                {...{ target: '_blank' }}
              >
                Need help?
              </Button>
              <button
                type="submit"
                className={cx(
                  'flex items-center text-lg font-bold group border-2 px-2 py-1 rounded-md border-gray-900',
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
        </Container>
      </div>
    </>
  )
}

export default SubmitBanner