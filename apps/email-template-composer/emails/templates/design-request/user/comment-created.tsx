import React from 'react'
import Paragraph from '../../../components/Paragraph'
import DesignRequestTemplate, {
  Props as DesignRequestTemplateProps,
} from '../template'

interface Props extends Omit<DesignRequestTemplateProps, 'templateName'> {}

const DesignRequestUserCommentCreatedTemplate = ({
  ...designRequestTemplateProps
}: Props) => {
  return (
    <DesignRequestTemplate
      {...designRequestTemplateProps}
      templateName="New comment"
    >
      {({ designRequest }) => (
        <Paragraph>
          A comment was left on your design request <b>{designRequest.name}</b>.
        </Paragraph>
      )}
    </DesignRequestTemplate>
  )
}

export default DesignRequestUserCommentCreatedTemplate
