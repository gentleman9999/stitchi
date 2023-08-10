import ClosetPageTitle from '@components/common/ClosetPageTitle'
import React from 'react'
import DesignRequestEditableName from './DesignRequestEditableName'
import DesignRequestActions from './DesignRequestActions'
import { useDesignContext } from '../design-context'
import { gql } from '@apollo/client'
import { DesignRequestTitleDesignRequesetFragment } from '@generated/DesignRequestTitleDesignRequesetFragment'
import SaveStateIndicator from '@components/common/SaveStateIndicator'

interface Props {
  loading: boolean
  designRequest?: DesignRequestTitleDesignRequesetFragment | null
}

const DesignRequestTitle = ({ loading, designRequest }: Props) => {
  const { saving } = useDesignContext()

  return (
    <ClosetPageTitle
      actions={
        designRequest ? (
          <DesignRequestActions designRequest={designRequest} />
        ) : null
      }
      title={
        <>
          {/* <SaveStateIndicator saving={saving} /> */}

          <DesignRequestEditableName
            name={designRequest?.name}
            loading={loading}
            designRequestId={designRequest?.id}
          />
        </>
      }
    />
  )
}

DesignRequestTitle.fragments = {
  designRequest: gql`
    ${DesignRequestActions.fragments.designRequest}

    fragment DesignRequestTitleDesignRequesetFragment on DesignRequest {
      id
      name
      ...DesignRequestActionsDesignRequestFragment
    }
  `,
}

export default DesignRequestTitle
