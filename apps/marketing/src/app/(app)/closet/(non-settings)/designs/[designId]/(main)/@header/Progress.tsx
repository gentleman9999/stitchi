'use client'

import React from 'react'
import cx from 'classnames'
import { DesignRequestStatus } from '@generated/types'
import { CheckIcon } from '@heroicons/react/20/solid'

const steps = [
  [DesignRequestStatus.DRAFT],
  [
    DesignRequestStatus.SUBMITTED,
    DesignRequestStatus.AWAITING_APPROVAL,
    DesignRequestStatus.AWAITING_REVISION,
  ],
  [
    DesignRequestStatus.APPROVED,
    DesignRequestStatus.REJECTED,
    DesignRequestStatus.ARCHIVED,
  ],
]

interface Props {
  status: DesignRequestStatus
}

const Progress = ({ status }: Props) => {
  const activeStepIndex = steps.findIndex(step => step.includes(status)) ?? 0

  return (
    <div className="@container">
      <ol
        role="list"
        className="@xl:border-y overflow-hidden rounded-sm @xl:flex @xl:rounded-none @xl:border-l @xl:border-r @xl:border-gray-200"
      >
        {steps.map((_, stepIdx) => {
          const completionStatus = (() => {
            if (activeStepIndex > stepIdx) {
              return 'completed'
            }
            if (activeStepIndex === stepIdx) {
              return 'current'
            }
            return 'upcoming'
          })()

          return (
            <li key={stepIdx} className="relative overflow-hidden @xl:flex-1">
              <div
                className={cx(
                  stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                  stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                  'overflow-hidden border border-gray-200 @xl:border-0',
                )}
              >
                {completionStatus === 'completed' ? (
                  <div className="group">
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-100 @xl:bottom-0 @xl:top-auto @xl:h-1 @xl:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={cx(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'flex items-start px-4 py-3 @xl:px-6 @xl:py-5 text-sm font-medium',
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                          <CheckIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium">
                          {humanizeStep(stepIdx, status)}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {status ? (
                            <>
                              {humanizeStepDescription(
                                stepIdx,
                                completionStatus,
                                status,
                              )}
                            </>
                          ) : null}
                        </span>
                      </span>
                    </span>
                  </div>
                ) : completionStatus === 'current' ? (
                  <div className="group">
                    <span
                      className={cx(
                        'absolute left-0 top-0 h-full w-1 bg-primary @xl:bottom-0 @xl:top-auto @xl:h-1 @xl:w-full',
                        {
                          'bg-red-500': status === DesignRequestStatus.REJECTED,
                        },
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cx(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'flex items-start px-4 py-3 @xl:px-6 @xl:py-5 text-sm font-medium',
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span
                          className={cx(
                            'flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary',
                            {
                              'border-red-500':
                                status === DesignRequestStatus.REJECTED,
                            },
                          )}
                        >
                          <span className="text-gray-800">{stepIdx + 1}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {humanizeStep(stepIdx, status)}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {status ? (
                            <>
                              {humanizeStepDescription(
                                stepIdx,
                                completionStatus,
                                status,
                              )}
                            </>
                          ) : null}
                        </span>
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="group">
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-100 @xl:bottom-0 @xl:top-auto @xl:h-1 @xl:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={cx(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'flex items-start px-4 py-3 @xl:px-6 @xl:py-5 text-sm font-medium',
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                          <span className="text-gray-500">{stepIdx + 1}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-500">
                          {humanizeStep(stepIdx, status)}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {status ? (
                            <>
                              {humanizeStepDescription(
                                stepIdx,
                                completionStatus,
                                status,
                              )}
                            </>
                          ) : null}
                        </span>
                      </span>
                    </span>
                  </div>
                )}

                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div
                      className="absolute inset-0 left-0 top-0 hidden w-3 @xl:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-200"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const humanizeStep = (step: number, status?: DesignRequestStatus | null) => {
  switch (step) {
    case 0:
      return 'Design Submitted'
    case 1:
      return 'Design in Progress'
    case 2:
      switch (status) {
        case DesignRequestStatus.REJECTED:
          return 'Design Rejected'
        case DesignRequestStatus.ARCHIVED:
          return 'Design Archived'
        default:
          return 'Design Ready'
      }
  }
}

const humanizeStepDescription = (
  step: number,
  completionStatus: 'completed' | 'current' | 'upcoming',
  status: DesignRequestStatus,
) => {
  switch (step) {
    case 0:
      switch (completionStatus) {
        case 'completed':
          return 'Request successfully received.'
        default:
          return 'Request is a draft.'
      }
    case 1:
      switch (completionStatus) {
        case 'completed':
          return 'Your design has been perfected.'
        case 'current':
          if (status === DesignRequestStatus.AWAITING_APPROVAL) {
            return 'Design awaiting your approval.'
          } else {
            return 'Artist crafting your design.'
          }
        default:
          return `Artist crafting your design.`
      }

    case 2:
      switch (status) {
        case DesignRequestStatus.REJECTED:
          return 'This design request was rejected.'
        case DesignRequestStatus.ARCHIVED:
          return 'This design request was archived.'
        default:
          return 'Design ready for production!'
      }
  }
}

export default Progress
