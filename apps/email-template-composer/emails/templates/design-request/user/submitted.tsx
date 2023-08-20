import { Section, Text } from '@react-email/components'
import React from 'react'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import DesignRequestTemplate, {
  Props as DesignRequestTemplateProps,
} from '../template'
import Paragraph from '../../../components/Paragraph'

interface User {
  name: string
}

interface DesignRequest {
  name: string
  submittedAt: string
  expectedCompletionDate: string | null
}

interface Props extends DesignRequestTemplateProps {
  user: User
  designRequest: DesignRequest
}

const DesignRequestSubittedTemplate = ({
  user = { name: 'John Doe' },
  designRequest = {
    name: 'Design Request Name',
    submittedAt: new Date().toISOString(),
    expectedCompletionDate: null,
  },
  ...designRequestTemplateProps
}: Props) => {
  return (
    <DesignRequestTemplate {...designRequestTemplateProps}>
      <Section>
        <Text>
          <Paragraph>
            Hello {user.name},
            <br />
            Thank you for submitting your design request.
            <br />
          </Paragraph>
        </Text>
      </Section>
      <Section className="my-6">
        <table className="min-w-full border-collapse text-sm">
          <tbody>
            <tr>
              <LeftCell>Design Name</LeftCell>
              <RightCell>{designRequest.name}</RightCell>
            </tr>
            <tr>
              <LeftCell>Submission Date</LeftCell>
              <RightCell>
                {format(parseISO(designRequest.submittedAt), 'PPP')}
              </RightCell>
            </tr>
            {designRequest.expectedCompletionDate && (
              <tr>
                <LeftCell>Expected Completion</LeftCell>
                <RightCell>
                  Approximately{' '}
                  {formatDistanceToNow(
                    parseISO(designRequest.expectedCompletionDate),
                    {
                      addSuffix: true,
                    },
                  )}{' '}
                  from now.
                </RightCell>
              </tr>
            )}
          </tbody>
        </table>
      </Section>
    </DesignRequestTemplate>
  )
}

const LeftCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border border-gray-100 border-solid p-2 text-left text-gray-700">
    {children}
  </td>
)

const RightCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border border-gray-100 border-solid p-2 text-right font-medium">
    {children}
  </td>
)

export default DesignRequestSubittedTemplate
