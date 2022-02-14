import getOrThrow from '@utils/get-or-throw'
import { NextApiHandler } from 'next'
import { object, string, Asserts } from 'yup'

const slackWebhookUrl = getOrThrow(
  process.env.SLACK_WEBHOOK_URL_CONTACT_FORM,
  'SLACK_WEBHOOK_URL_CONTACT_FORM',
)

const environment = getOrThrow(process.env.VERCEL_ENV, 'VERCEL_ENV')

const subject = `${
  environment !== 'production' ? `(${environment}) ` : ''
}Someone has submitted a contact form :rocket: :rocket:`

const formInputSchema = object({
  email: string().email().required(),
  first_name: string().optional(),
  last_name: string().optional(),
  company: string().optional(),
  phone: string().optional(),
  description: string().optional(),
  budget: string().optional(),
}).label('Form Input')

export type FormInput = Asserts<typeof formInputSchema>

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST':
        const formInput = await formInputSchema.validate(req.body)

        console.info('Starting to send form response to Slack')

        const response = await fetch(slackWebhookUrl, {
          method: 'POST',
          body: JSON.stringify({
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: subject,
                  emoji: true,
                },
              },
              {
                type: 'context',
                elements: [
                  {
                    type: 'mrkdwn',
                    text: `*Email*: ${formInput.email}`,
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Name*: ${formInput.first_name} ${formInput.last_name}`,
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Company*: ${formInput.company}`,
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Budget*: ${formInput.budget}`,
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Description*: ${formInput.description}`,
                  },
                ],
              },
            ],
          }),
        })

        if (response.ok) {
          console.info('Form response sent to Slack')
        } else {
          console.error('Failed to send form response to Slack', {
            context: { response },
          })
          throw new Error(`${response.status} ${response.statusText}`)
        }

        res.status(200).json(formInput)

      default:
        throw new Error(`Unsupported method "${req.method}"`)
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
}

export default handler
