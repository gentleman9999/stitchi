import React from 'react'
import Paragraph from '../../../components/Paragraph'

import DesignRequestTemplate, {
  Props as DesignRequestTemplateProps,
} from '../template'

interface Props extends Omit<DesignRequestTemplateProps, 'templateName'> {}

const DesignRequestUserApprovedTemplate = ({
  ...designRequestTemplateProps
}: Props) => {
  return (
    <DesignRequestTemplate
      {...designRequestTemplateProps}
      templateName="Design approved 🚀"
    >
      {({ designRequest }) => (
        <Paragraph>
          Your design request <b>{designRequest.name}</b> has been approved. You
          can now place an order for this design.
        </Paragraph>
      )}
    </DesignRequestTemplate>
  )
}

export default DesignRequestUserApprovedTemplate
