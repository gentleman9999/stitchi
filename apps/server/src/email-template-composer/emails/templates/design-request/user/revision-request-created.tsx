import React from 'react'
import Paragraph from '../../../components/Paragraph'
import DesignRequestTemplate, {
  Props as DesignRequestTemplateProps,
} from '../template'

interface Props extends Omit<DesignRequestTemplateProps, 'templateName'> {}

const DesignRequestUserRevisionRequestCreatedTemplate = ({
  ...designRequestTemplateProps
}: Props) => {
  return (
    <DesignRequestTemplate
      {...designRequestTemplateProps}
      templateName="Revision requested"
    >
      {({ designRequest }) => (
        <Paragraph>
          Someone requested a revision for design request{' '}
          <b>{designRequest.name}</b>.
        </Paragraph>
      )}
    </DesignRequestTemplate>
  )
}

export default DesignRequestUserRevisionRequestCreatedTemplate
