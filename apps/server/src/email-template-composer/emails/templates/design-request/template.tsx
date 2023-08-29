import { Section } from '@react-email/components'
import React from 'react'
import Button from '../../components/Button'
import { baseUrl } from '../../environment'
import EmailTemplate, {
  Props as EmailTemplateProps,
  Recipient,
} from '../template'

interface DesignRequest {
  id: string
  name: string
  submittedAt: string
  expectedCompletionTime: string | null
  creatorName: string
}

export interface Props extends Omit<EmailTemplateProps, 'children'> {
  designRequest: DesignRequest
  children:
    | React.ReactNode
    | ((props: {
        designRequest: DesignRequest
        recipient: Recipient
      }) => React.ReactNode)
}

const DesignRequestTemplate = ({
  designRequest = {
    id: '123',
    creatorName: 'Erlich Bachman',
    name: 'Bachmanity',
    expectedCompletionTime: '4-6 hours',
    submittedAt: new Date().toISOString(),
  },
  children,
  ...emailTemplateProps
}: Props) => (
  <EmailTemplate {...emailTemplateProps}>
    {({ recipient }) => (
      <>
        {typeof children === 'function'
          ? children({ designRequest, recipient })
          : children}

        <Section className="text-center mt-8">
          <Button
            href={`${baseUrl}/api/notifications/design-requests/${designRequest.id}`}
          >
            See more details
          </Button>
        </Section>
      </>
    )}
  </EmailTemplate>
)

export default DesignRequestTemplate
