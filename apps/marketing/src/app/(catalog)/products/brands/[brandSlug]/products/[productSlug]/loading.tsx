import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { StarIcon } from '@heroicons/react/20/solid'
import Button from '@components/ui/ButtonV2/Button'
import LinkInline from '@components/ui/LinkInline'
import routes from '@lib/routes'

interface Props {}

const Loading = () => {
  return (
    <div className="@container w-full">
      <div className="w-full flex flex-col @2xl:flex-row relative z-0">
        <div className="flex flex-col @2xl:flex-row w-full gap-2">
          <div className="flex-1">
            <Skeleton className="w-full h-[65vh]" />
          </div>
          <div className="flex-1 @2xl:max-w-md ml-auto shrink w-full">
            <div className="relative flex flex-col gap-8 mb-8 bg-paper">
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 font-light">
                  <Skeleton width="30%" />
                </span>

                <h1 className="font-headingDisplay uppercase font-semibold text-2xl sm:text-3xl text-gray-800">
                  <Skeleton width="70%" />
                </h1>

                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-0.5">
                    {Array.from(new Array(5)).map((_, index) => (
                      <StarIcon key={index} className="w-6 h-6 fill-gray-200" />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">(0)</span>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-lg">
                      <Skeleton width="10%" />
                    </span>

                    <ul className="flex flex-wrap gap-1 py-1">
                      {Array.from(new Array(5)).map((_, i) => {
                        return (
                          <span
                            key={i}
                            className="rounded-full border border-gray-100 w-6 h-6"
                          />
                        )
                      })}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="font-headingDisplay font-semibold text-2xl sm:text-3xl text-gray-800">
                        From $<Skeleton width="40px" />
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Pricing varies by print areas, ink colors, and units
                        ordered.
                      </p>
                    </div>

                    <Button loading size="2xl" color="brandPrimary">
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
