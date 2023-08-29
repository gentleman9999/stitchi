import React from 'react'
import Paragraph from '../../../components/Paragraph'

import DesignRequestTemplate, {
  Props as DesignRequestTemplateProps,
} from '../template'

interface Props extends Omit<DesignRequestTemplateProps, 'templateName'> {
  reason: string
}

const DesignRequestUserRejectedTemplate = ({
  reason = 'Someone on your team rejected the design request.',
  ...designRequestTemplateProps
}: Props) => {
  return (
    <DesignRequestTemplate
      {...designRequestTemplateProps}
      templateName="Design rejected 🚫"
    >
      {({ designRequest }) => (
        <>
          <Paragraph>
            Your design request <b>{designRequest.name}</b> was rejected.
          </Paragraph>
          <br />
          <Paragraph>
            <b>Reason</b>: {reason}
          </Paragraph>
        </>
      )}
    </DesignRequestTemplate>
  )
}

export default DesignRequestUserRejectedTemplate
