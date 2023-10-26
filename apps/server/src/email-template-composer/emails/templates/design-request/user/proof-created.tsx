import React from 'react'
import Paragraph from '../../../components/Paragraph'
import DesignRequestTemplate, {
  Props as DesignRequestTemplateProps,
} from '../template'

interface Props extends Omit<DesignRequestTemplateProps, 'templateName'> {}

const DesignRequestUserProofCreatedTemplate = ({
  ...designRequestTemplateProps
}: Props) => {
  return (
    <DesignRequestTemplate
      {...designRequestTemplateProps}
      templateName="You've received a proof!"
    >
      {({ designRequest }) => (
        <Paragraph>
          Great news! A new proof for your design request{' '}
          <b>{designRequest.name}</b> has been uploaded.
        </Paragraph>
      )}
    </DesignRequestTemplate>
  )
}

export default DesignRequestUserProofCreatedTemplate
