import React from 'react'
import cx from 'classnames'
import { DesignRequestStatus } from '@generated/globalTypes'
import { Check } from 'icons'

const steps = [
  [DesignRequestStatus.DRAFT],
  [
    DesignRequestStatus.SUBMITTED,
    DesignRequestStatus.AWAITING_APPROVAL,
    DesignRequestStatus.AWAITING_REVISION,
  ],
  [DesignRequestStatus.APPROVED],
]

interface Props {
  loading: boolean
  status?: DesignRequestStatus | null
}

const Progress = ({ status, loading }: Props) => {
  const activeStepIndex = status
    ? steps.findIndex(step => step.includes(status))
    : 0

  return (
    <ol role="list" className="overflow-hidden">
      {steps.map((_, stepIdx) => {
        const completionStatus = (() => {
          if (loading) {
            return 'upcoming'
          }

          if (activeStepIndex > stepIdx) {
            return 'completed'
          }
          if (activeStepIndex === stepIdx) {
            return 'current'
          }
          return 'upcoming'
        })()

        return (
          <li
            key={stepIdx}
            className={cx(
              stepIdx !== steps.length - 1 ? 'pb-10' : '',
              'relative',
            )}
          >
            <>
              {stepIdx !== steps.length - 1 ? (
                <div
                  className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-green-600"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start">
                <span className="flex h-9 items-center">
                  {completionStatus === 'completed' ? (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 ">
                      <Check
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  ) : null}

                  {completionStatus === 'current' ? (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                    </span>
                  ) : null}

                  {completionStatus === 'upcoming' ? (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent " />
                    </span>
                  ) : null}
                </span>

                <span className="ml-4 flex min-w-0 flex-col">
                  <span
                    className={cx('text-sm font-medium', {
                      'text-green-600': completionStatus === 'current',
                      'text-gray-500': completionStatus === 'upcoming',
                    })}
                  >
                    {humanizeStep(stepIdx)}
                  </span>
                  {status ? (
                    <span className={cx('text-sm text-gray-500', {})}>
                      {humanizeStepDescription(
                        stepIdx,
                        completionStatus,
                        status,
                      )}
                    </span>
                  ) : null}
                </span>
              </div>
            </>
          </li>
        )
      })}
    </ol>
  )
}

const humanizeStep = (step: number) => {
  switch (step) {
    case 0:
      return 'Draft'
    case 1:
      return 'In progress'
    case 2:
      return 'Approved'
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
          return 'The design request has been submitted.'
        default:
          return 'The design request has been saved as a draft.'
      }
    case 1:
      switch (completionStatus) {
        case 'completed':
          return 'Your design has been perfected.'
        case 'current':
          if (status === DesignRequestStatus.AWAITING_APPROVAL) {
            return 'Artist has submitted proof. Design awaiting your approval.'
          } else {
            return 'An artist is currently perfecting your design.'
          }
        default:
          return `Submit your design request once you're ready for an artist to start working on it.`
      }

    case 2:
      switch (completionStatus) {
        case 'current':
        case 'completed':
          return 'Your design is ready for print!'
        default:
          return 'Approve your design for print once you are happy with it.'
      }
  }
}

export default Progress
