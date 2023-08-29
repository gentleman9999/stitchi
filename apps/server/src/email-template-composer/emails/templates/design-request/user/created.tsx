import { Section } from '@react-email/components'
import React from 'react'
import { format, parseISO } from 'date-fns'
import DesignRequestTemplate, {
  Props as DesignRequestTemplateProps,
} from '../template'
import Paragraph from '../../../components/Paragraph'
import DescriptionList from '../../../components/DescriptionList'

interface Props extends Omit<DesignRequestTemplateProps, 'templateName'> {}

const DesignRequestUserCreatedTemplate = ({
  ...designRequestTemplateProps
}: Props) => {
  return (
    <DesignRequestTemplate
      {...designRequestTemplateProps}
      templateName="Design request submitted"
    >
      {({ designRequest, recipient }) => (
        <>
          <Paragraph>
            Hi {recipient.name},
            <br />
            <br />A new design request has been submitted.
          </Paragraph>
          <Section className="mt-8 w-full">
            <DescriptionList
              items={[
                { label: 'Design Name', description: designRequest.name },
                {
                  label: 'Requested By',
                  description: designRequest.creatorName,
                },
                {
                  label: 'Submission Date',
                  description: format(
                    parseISO(designRequest.submittedAt),
                    'PPP',
                  ),
                },
                ...(designRequest.expectedCompletionTime
                  ? [
                      {
                        label: 'Est. Completion Time',
                        description: designRequest.expectedCompletionTime,
                      },
                    ]
                  : []),
              ]}
            />
          </Section>
        </>
      )}
    </DesignRequestTemplate>
  )
}

export default DesignRequestUserCreatedTemplate
