import React from 'react'
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
} from '@react-email/components'
import colors from 'tailwindcss/colors'
import Heading1 from '../components/Heading1'
import Paragraph from '../components/Paragraph'
import {
  baseUrl,
  emailNotificationSettingsUrl,
  supportUrl,
} from '../environment'
import InlineLink from '../components/InlineLink'

export interface Recipient {
  name?: string | null
}

export interface Props {
  previewText: string
  templateName: string
  recipient: Recipient

  children:
    | React.ReactNode
    | ((props: {
        templateName: string
        recipient: Recipient
      }) => React.ReactNode)
}

const EmailTemplate = ({
  recipient = { name: 'there' },
  templateName = 'Template name',
  previewText = '',
  children,
}: Props) => (
  <Html>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta
        name="format-detection"
        content="telephone=no, date=no, address=no, email=no, url=no"
      />
      <meta name="x-apple-disable-message-reformatting" />
      <meta name="color-scheme" content="light" />
      <meta name="supported-color-schemes" content="light" />

      <style>
        {`
          :root {
            color-scheme: light;
            supported-color-schemes: light;
          }
        `}
      </style>
    </Head>
    <Preview>{previewText}</Preview>
    <Tailwind
      config={{
        theme: {
          colors: {
            primary: '#bdfd6d',
            gray: colors.gray,
            black: colors.stone[900],
            white: colors.white,
          },
        },
      }}
    >
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container className="border border-solid border-[#eaeaea] rounded my-8 mx-auto px-8 w-[465px]">
          <Section className="pt-4 pb-2">
            <Row>
              <Column align="center">
                <Img
                  src="https://www.stitchi.co/logo.png"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Heading1>{templateName}</Heading1>
              </Column>
            </Row>
          </Section>

          {typeof children === 'function'
            ? children({ templateName, recipient })
            : children}

          <Hr className="mb-0 mx-0 mt-8 w-full" />

          <Paragraph className="text-xs text-gray-600 pt-4 text-left">
            Stitchi LLC. -{' '}
            <InlineLink href={baseUrl}>
              {baseUrl.replace(/https?:\/\//, '')}
            </InlineLink>
          </Paragraph>

          <Paragraph className="text-xs text-gray-600 pt-4 text-left">
            If you’d like to talk to a support team member, please{' '}
            <InlineLink href={supportUrl}>send us a message</InlineLink>.
          </Paragraph>

          <Paragraph className="text-xs text-gray-600 pt-4 text-left">
            <InlineLink href={emailNotificationSettingsUrl}>
              Click here to manage your notification settings
            </InlineLink>
            .
          </Paragraph>

          <div className="pt-4" />
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default EmailTemplate
