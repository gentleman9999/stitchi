import React from 'react'
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
} from '@react-email/components'

export interface Props {
  previewText: string
  children: React.ReactNode
  templateName: string
}

const EmailTemplate = ({
  templateName = 'Template name',
  previewText = '',
  children,
}: Props) => (
  <Html>
    <Head>
      <Font
        fontFamily="Outfit"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&display=swap',
          format: 'woff2',
        }}
        fontWeight={500}
        fontStyle="normal"
      />
    </Head>
    <Preview>{previewText}</Preview>
    <Body
      style={{
        backgroundColor: '#f6f9fc',
        fontFamily: 'Outfit, Verdana, sans-serif',
      }}
    >
      <Tailwind>
        <Container className="bg-white mx-auto my-0 rounded border border-solid border-[#eaeaea] w-[465px] mb-20">
          <Section className="px-10 pt-10 pb-2">
            <table className="w-full">
              <tr>
                <td align="left" width="60">
                  <Img
                    src="https://www.stitchi.co/logo.png"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </td>

                <td className="text-right text-xs font-medium">
                  {templateName}
                </td>
              </tr>
            </table>
          </Section>

          <div className="px-10 pb-10">{children}</div>
        </Container>
      </Tailwind>
    </Body>
  </Html>
)

export default EmailTemplate
