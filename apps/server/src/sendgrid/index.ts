import { getOrThrow } from '../utils'
import sendgridClient from '@sendgrid/client'
import * as yup from 'yup'

const personalizationSchema = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        to: yup
          .array()
          .of(
            yup.object().shape({
              email: yup.string().email().required(),
              name: yup.string().optional(),
            }),
          )
          .min(1)
          .required(),
      })
      .required(),
  )
  .min(1)
  .required()

const messageSchema = yup.object().shape({
  subject: yup.string().required(),
  // Unix timestamp
  sendAt: yup.number().optional(),
  from: yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().optional(),
  }),
  replyTo: yup
    .object()
    .shape({
      email: yup.string().email().optional(),
      name: yup.string().optional(),
    })
    .optional(),
  content: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().oneOf(['text/plain', 'text/html']).required(),
        value: yup.string().required(),
      }),
    )
    .required(),
  personalizations: personalizationSchema,
})

const contactSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
})

const sendgridApiKey = getOrThrow(
  process.env.SENDGRID_API_KEY,
  'SENDGRID_API_KEY',
)

sendgridClient.setApiKey(sendgridApiKey)

interface AddMarketingContactsInput {
  contacts: yup.InferType<typeof contactSchema>[]
}

interface SendTransactionalEmailInput {
  message: yup.InferType<typeof messageSchema>
}

export interface SendgridClient {
  sendTransactionalEmail: (input: SendTransactionalEmailInput) => Promise<void>
  addMarketingContacts: (input: AddMarketingContactsInput) => Promise<void>
}

const makeClient = (
  { sendgrid }: { sendgrid: typeof sendgridClient } = {
    sendgrid: sendgridClient,
  },
): SendgridClient => {
  return {
    sendTransactionalEmail: async input => {
      const message = messageSchema.validateSync(input.message)

      await sendgrid.request(
        {
          url: `/v3/mail/send`,
          method: 'POST',
          body: JSON.stringify({
            personalizations: message.personalizations.map(personalization => ({
              to: personalization.to.map(to => ({
                email: to.email,
                name: to.name,
              })),
            })),
            from: {
              email: message.from.email,
              name: message.from.name,
            },
            reply_to: message.replyTo
              ? {
                  email: message.replyTo.email,
                  name: message.replyTo.name,
                }
              : undefined,
            content: message.content,
            send_at: message.sendAt,
            subject: message.subject,
          }),
        },
        (error, response) => {
          if (error) {
            console.error('Error sending email to SendGrid', {
              context: { error },
            })

            return
          } else {
            return response
          }
        },
      )
    },
    addMarketingContacts: async input => {
      const contacts = input.contacts.map(contact => {
        try {
          return contactSchema.validateSync(contact)
        } catch (error) {
          console.error(error)
          throw new Error('Invalid input')
        }
      })

      const [response] = await sendgrid.request({
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: JSON.stringify({
          contacts: contacts.map(contact => ({
            email: contact.email,
            first_name: contact.firstName,
            last_name: contact.lastName,
          })),
        }),
      })

      if (response.statusCode !== 202) {
        console.error(`Error sending contact form response to SendGrid`, {
          context: { response },
        })

        throw new Error(`Error sending contact form response to SendGrid`)
      }
    },
  }
}

export { makeClient }
