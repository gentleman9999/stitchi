import ClosetPageTitle from '@components/common/ClosetPageTitle'
import React from 'react'
import cx from 'classnames'
import { LoadingDots } from '@components/ui'
import { Check } from 'icons'
import DesignRequestEditableName from './DesignRequestEditableName'
import DesignRequestActions from './DesignRequestActions'
import { useDesignContext } from '../design-context'
import { gql } from '@apollo/client'
import { DesignRequestHeaderDesignRequesetFragment } from '@generated/DesignRequestHeaderDesignRequesetFragment'

interface Props {
  loading: boolean
  designRequest?: DesignRequestHeaderDesignRequesetFragment | null
}

const DesignRequestHeader = ({ loading, designRequest }: Props) => {
  const { saving } = useDesignContext()

  return (
    <ClosetPageTitle
      title={
        <>
          <div
            className={cx(
              'text-xs inline-flex items-center gap-1 px-1 border rounded-full text-gray-400',
              {
                'pr-0.5': !saving,
              },
            )}
          >
            {saving ? (
              <>
                Saving <LoadingDots dotClassName="!w-0.5 !h-0.5" />
              </>
            ) : (
              <>
                Saved{' '}
                <Check
                  className="w-3 h-3 bg-primary rounded-full p-0.5"
                  strokeWidth={3}
                />
              </>
            )}
          </div>

          <DesignRequestEditableName
            name={designRequest?.name}
            loading={loading}
            designRequestId={designRequest?.id}
          />
        </>
      }
      actions={
        designRequest ? (
          <DesignRequestActions designRequest={designRequest} />
        ) : null
      }
    />
  )
}

DesignRequestHeader.fragments = {
  designRequest: gql`
    ${DesignRequestActions.fragments.designRequest}

    fragment DesignRequestHeaderDesignRequesetFragment on DesignRequest {
      id
      name
      ...DesignRequestActionsDesignRequestFragment
    }
  `,
}

export default DesignRequestHeader
