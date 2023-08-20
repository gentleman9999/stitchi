import { Section } from '@react-email/components'
import React from 'react'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import { baseUrl } from '../../environment'
import EmailTemplate, { Props as EmailTemplateProps } from '../template'

export interface Props extends EmailTemplateProps {
  designRequestId: string
  children: React.ReactNode
}

const DesignRequestTemplate = ({
  designRequestId,
  children,
  ...emailTemplateProps
}: Props) => (
  <EmailTemplate {...emailTemplateProps}>
    {children}
    <Section className="text-center mt-8">
      <Button href={`${baseUrl}/api/email/design-requests/${designRequestId}`}>
        View design request
      </Button>
    </Section>
    <Paragraph>
      <br />
      <br />
      Thank you for choosing us!
      <br />
      <br />
      <br />
      Warm Regards,
      <br />
      Stitchi
    </Paragraph>
  </EmailTemplate>
)

export default DesignRequestTemplate
